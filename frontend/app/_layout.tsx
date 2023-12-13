import {SafeAreaProvider} from "react-native-safe-area-context";
import {PaperProvider, MD3LightTheme as Theme, Appbar} from "react-native-paper";
import {Slot} from "expo-router";
import IndexScreen from "../components/IndexScreen";

const HomeLayout = () => {
    return (

        <PaperProvider theme={theme}>
            <SafeAreaProvider>

                <IndexScreen/>
                {/* <Slot/> */}

            </SafeAreaProvider>
        </PaperProvider>
    );
}

const theme = {
    ...Theme,
    colors: {
        ...Theme.colors,
        primary: '#6DA5C0',
        accent: '#6DA5C0',
    },
};

export default HomeLayout;