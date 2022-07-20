import React from "react";
import {View, ScrollView, Text} from 'react-native'
import TabListElement from "../style/tabListElement";

const RecoBeforeScreen = () => {
    return (
        <View accessible={true}>
            <ScrollView>
            <TabListElement text=
                    "Recogé la basura, escombros, ramas y hojas de tu casa para evitar que obstaculicen el paso del agua durante lluvias intensas y desborde de arroyos"/>
                <TabListElement text="Revisá periódicamente el estado de techos, canaletas, rejillas y desagües pluviales de tu casa. Sellá posibles fultraciones con algún material impermeable"/>
                <TabListElement text="Identificá que muebles o ropa pueden verse afectados por el agua. Planificá como podrías elevarlos en caso de precisarlo y de ser posible, adelantate y colocalos en un lugar alto."/>
            </ScrollView>
        </View>
    )
}

export default RecoBeforeScreen