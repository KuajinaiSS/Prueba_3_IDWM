import {SafeAreaProvider} from "react-native-safe-area-context";
import {PaperProvider, MD3LightTheme as Theme, Appbar} from "react-native-paper";
import {Slot} from "expo-router";
import MobileAppScreen from "../components/MobileAppScreen";

const HomeLayout = () => {
    return (

        <PaperProvider theme={theme}>
            <SafeAreaProvider>

                <MobileAppScreen/>

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