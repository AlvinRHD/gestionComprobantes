const API_URL = 'http://localhost:4000/api';


///AQUI EMPIEZA FUNCION PARA INICIAR SESION
async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Error al iniciar sesión');
        }

        const data = await response.json();
        console.log('Sesión iniciada:', data);
        return data;
    } catch (error) {
        console.error(error);
        alert('Credenciales incorrectas');
    }
}
//AQUI TERMINA FUNCION PARA INICAR SESION


//AQUI EMPIEZA FUNCION PARA EMPRESAS
// Función para obtener empresas (ya autenticado)
async function getEmpresas() {
    try {
        const response = await fetch(`${API_URL}/empresas`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener las empresas');
        }

        const empresas = await response.json();
        return empresas;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Función para agregar empresa
async function CreateEmpresa(empresaData) {
    try {
        const response = await fetch(`${API_URL}/empresas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify(empresaData),
        });

        if (!response.ok) {
            throw new Error('Error al agregar la empresa');
        }

        const empresa = await response.json();
        return empresa;
    } catch (error) {
        console.error(error);
        alert('Error al agregar la empresa');
    }
}

// Función para eliminar empresa
async function deleteEmpresa(id) {
    try {
        const response = await fetch(`${API_URL}/empresas/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la empresa');
        }
        return true;
    } catch (error) {
        console.error(error);
        alert('Error al eliminar la empresa');
        return false;
    }
}
//AQUI TERMINA FUNCION PARA EMPRESAS
