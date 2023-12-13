import { ActivityIndicator, Button, Card, Text, Modal, Portal, TextInput } from 'react-native-paper';
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Post } from '../models/Post';
import axios from "axios";


const MobileAppScreen = () => {
    const [posts, setPosts] = useState<Post[]>([]);


    const url = "http://localhost:3000/posts"; // donde se levanto el backend

    useEffect(() => {
        handleGet();
    }, []);


    const handleGet = async () => {
        axios.get(url+"/posts")
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
            });
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
                                <Text variant={"bodySmall"}>Descripcion: {post.author}</Text>
                                <Text variant={"bodySmall"}>Precio: ${post.image}</Text>
                            </Card.Content>

                            <Card.Actions>

                                <Button mode={"contained"} onPress={() => handleDelete(post.id)}>
                                    <Text variant={"bodySmall"}>Eliminar</Text>
                                </Button>

                            </Card.Actions>

                        </Card>
                    );
                })}
            </ScrollView>

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

export default MobileAppScreen;