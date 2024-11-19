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

async function updateEmpresa(id, empresaData) {
    try {
        const response = await fetch(`${API_URL}/empresas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify(empresaData),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la empresa');
        }

        return true;
    } catch (error) {
        console.error(error);
        alert('Error al actualizar la empresa');
        return false;
    }
}
async function getEmpresaById(id) {
    try {
        const response = await fetch(`${API_URL}/empresas/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener la empresa');
        }

        const empresa = await response.json();
        return empresa;
    } catch (error) {
        console.error(error);
        return null;
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





//AQUI EMPIEZA FUNCION PARA COMPROBANTES
// Obtener los comprobantes según el tipo
async function getComprobantes(tipo) {
    try {
        // Si `tipo` es vacío o no está definido, no lo incluyas en la URL
        const url = tipo ? `${API_URL}/comprobantes/${tipo}` : `${API_URL}/comprobantes`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los comprobantes');
        }

        const comprobantes = await response.json();
        return comprobantes;
    } catch (error) {
        console.error(error);
        return [];
    }
}


// Agregar un nuevo comprobante
async function CreateComprobante(comprobanteData) {
    try {
        const response = await fetch(`${API_URL}/comprobantes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify(comprobanteData),
        });

        if (!response.ok) {
            throw new Error('Error al agregar el comprobante');
        }

        const comprobante = await response.json();
        return comprobante;
    } catch (error) {
        console.error(error);
        alert('Error al agregar el comprobante');
    }
}


async function updateComprobante(id, comprobanteData) {
    try {
        const response = await fetch(`${API_URL}/comprobantes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify(comprobanteData),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el comprobante');
        }

        return true;
    } catch (error) {
        console.error(error);
        alert('Error al actualizar el comprobante');
        return false;
    }
}


// Eliminar un comprobante
async function deleteComprobante(id) {
    try {
        const response = await fetch(`${API_URL}/comprobantes/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el comprobante');
        }

        return true;
    } catch (error) {
        console.error(error);
        alert('Error al eliminar el comprobante');
        return false;
    }
}

//AQUI TERMINA FUNCION DE COMPROBANTES


