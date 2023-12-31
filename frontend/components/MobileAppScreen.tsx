import { ActivityIndicator, Button, Card, Text, Modal, Portal, TextInput } from 'react-native-paper';
import { ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Post } from '../models/Post';
import axios from "axios";


const MobileAppScreen = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Post[]>([]);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0);

    const showModalDeleting = () => setIsDeleting(true);
    const hideModalDeleting = () => setIsDeleting(false);



    const url = "http://localhost:3000/posts/"; // donde se levanto el backend
    const url2 = "http://localhost:3000/comments"; // donde se levanto el backend

    useEffect(() => {
        handleGet();
    }, []);


    const handleGet = async () => {
        axios.get(url)
            .then((response) => {
                setPosts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                console.log("Finalizo");
            });

    }

    const handleGet2 = async () => {

    }

    const handleDelete = async (id: number) => {
        axios.delete(url + id)
            .then((response) => {
                console.log(response.data);
                setPosts(posts.filter(post => post.id !== id));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                console.log("Finalizo");
                hideModalDeleting();
            });
    }

    const handleIsDeleting = (id: number) => {
        setIsDeleting(true);
        setIdDelete(id);
    }



    return (
        <SafeAreaView style={styles.container}>
            <Text variant={"displaySmall"}>Posts</Text>



            <ScrollView style={styles.scrollView}>
                {posts.map((post) => {
                    return (
                        <Card style={styles.card} key={post.id}>
                            <Card.Title title={post.title} titleVariant={"headlineSmall"} />

                            <Card.Content>
                                <Text variant={"bodySmall"}>Autor: {post.author}</Text>
                            </Card.Content>

                            <Card.Cover source={{ uri: post.image }} style={styles.cardImage} /> {/* Añade la imagen aquí */}
                            <Card.Actions>

                                <Button mode={"contained"} onPress={() => handleIsDeleting(post.id)}>
                                    <Text variant={"bodySmall"}>Eliminar</Text>
                                </Button>

                            </Card.Actions>

                        </Card>
                    );
                })}
            </ScrollView>

            <Portal>
                <Modal visible={isDeleting} onDismiss={hideModalDeleting} contentContainerStyle={styles.containerStyle}>
                    <Text variant={"displaySmall"}>¿Estas seguro que deseas eliminar?</Text>
                    <Button style={styles.button} mode={"contained"} onPress={() => handleDelete(idDelete)}>
                        <Text variant={"bodySmall"}>Eliminar</Text>
                    </Button>

                    <Button style={styles.button} mode={"contained"} onPress={hideModalDeleting}>
                        <Text variant={"bodySmall"}>Cancelar</Text>
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
    cardImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        borderRadius: 0,
    },
});

export default MobileAppScreen;