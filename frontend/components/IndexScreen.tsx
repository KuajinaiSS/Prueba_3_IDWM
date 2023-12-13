import { ActivityIndicator, Button, Card, Text, Modal, Portal, TextInput } from 'react-native-paper';
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Producto } from '../models/Producto';
import axios from "axios";


const IndexScreen = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const [id, setId] = useState<number>(0);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState<number>(0);
    const [descripcion, setDescripcion] = useState('');
    const [linkImagen, setLinkImagen] = useState('');


    const showModalCreating = () => setIsCreating(true);
    const hideModalCreating = () => setIsCreating(false);

    const showModalEditing = () => setIsEditing(true);
    const hideModalEditing = () => setIsEditing(false);

    const url = "http://192.168.4.43:8000/api/products/"; // donde se levanto el backend

    useEffect(() => {
        handleGet();
    }, []);


    const handleGet = async () => {
        axios.get(url)
            .then((response) => {
                setProductos(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                console.log("Finalizo");
            });
    }

    const handleDelete = async (id: number) => {
        axios.delete(url + id)
            .then((response) => {
                console.log(response.data);
                setProductos(productos.filter(producto => producto.id !== id));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                console.log("Finalizo");
            });
    }

    // const handleCreate = async () => {
    //     axios.post(url)
    //         .then((response) => {
    //             console.log(response.data);
    //             setProductos(productos.filter(producto => producto.id !== id));
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    //         .finally(() => {
    //             console.log("Finalizo");
    //         });
    // }

    const handleUpdate = async (id: number) => {
        axios.put(url + id)
            .then((response) => {
                console.log(response.data);
                setProductos(productos.filter(producto => producto.id !== id));
            })
            .catch((error) => {
                console.log(error + " " + id);
            })
            .finally(() => {
                console.log("Finalizo");
            });
    }

    const handleisCreating = () => {
        showModalCreating();
        console.log("isCreating");
    }

    const handleisEditing = (id: number) => {
        const producto = productos.find(producto => producto.id === id);

        setId(producto?.id || 0);
        setNombre(producto?.name || '');
        setPrecio(producto?.price.toString() || '');
        setDescripcion(producto?.description || '');
        setLinkImagen(producto?.image || '');

        showModalEditing();
        console.log("isEditing");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text variant={"displaySmall"}>Productos</Text>

            <Button style={styles.createButton} mode={"contained"} onPress={handleisCreating}>
                <Text variant={"bodySmall"}>Crear</Text>
            </Button>

            <ScrollView style={styles.scrollView}>
                {productos.map((producto) => {
                    return (
                        <Card style={styles.card} key={producto.id}>
                            <Card.Title title={producto.name} titleVariant={"headlineSmall"} />

                            <Card.Content>
                                <Text variant={"bodySmall"}>Descripcion: {producto.description}</Text>
                                <Text variant={"bodySmall"}>Precio: ${producto.price}</Text>
                            </Card.Content>

                            <Card.Actions>

                                <Button mode={"contained"} onPress={() => handleDelete(producto.id)}>
                                    <Text variant={"bodySmall"}>Eliminar</Text>
                                </Button>

                                <Button mode={"contained"} onPress={() => handleisEditing(producto.id)}>
                                    <Text variant={"bodySmall"}>Editar</Text>
                                </Button>

                            </Card.Actions>

                        </Card>
                    );
                })}
            </ScrollView>

            <Portal>
                <Modal visible={isCreating} onDismiss={hideModalCreating} contentContainerStyle={styles.containerStyle}>
                    <Text>creando...</Text>
                </Modal>
            </Portal>


            <Portal>
                <Modal visible={isEditing} onDismiss={hideModalEditing} contentContainerStyle={styles.containerStyle}>
                    <TextInput label="Nombre" value={nombre} onChangeText={nombre => setNombre(nombre)}/>
                    <TextInput label="Precio" value={precio} keyboardType="numeric" onChangeText={precio => setPrecio(precio)}/>
                    <TextInput label="Descripcion" value={descripcion} onChangeText={descripcion => setDescripcion(descripcion)}/>
                    <TextInput label="Link Imagen" value={linkImagen} onChangeText={imagen => setLinkImagen(imagen)}/>
                    <Button mode={"contained"} onPress={() => handleUpdate(id)}>
                        <Text variant={"bodySmall"}>Actualizar</Text>
                    </Button>
                </Modal>
            </Portal>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 0,
        gap: 20,
    },
    button: {
        width: '100%',
        marginTop: 10,
    },
    input: {
        width: '100%',
    },
    image: {
        width: 150,
        height: 150,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    helperText: {
        backgroundColor: "rgba(255,0,0,0.14)",
        width: '100%',
        textAlign: 'center',
        borderRadius: 5,
    },
    card: {
        width: '100%',
        marginTop: 20,
        backgroundColor: "#F5F5F5",
        justifyContent: 'center',

    },
    scrollView: {
        width: '95%',
        gap: 15,
        margin: 0,
        padding: 0,
    },
    loading: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.07)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createButton: {
        width: '100%',
        marginTop: 5,
        marginBottom: 0,
    },
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
    },
});

export default IndexScreen;