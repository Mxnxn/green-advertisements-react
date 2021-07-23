import { PDFViewer } from "@react-pdf/renderer";
import { Page, Document, Image, StyleSheet, View, Text } from "@react-pdf/renderer";
import React, { Fragment } from "react";
const styles = StyleSheet.create({
    row: {
        width: "100%",
        height: 90,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    row2: {
        width: "100%",
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
    },
});

const AvailableTemplate = ({ data }) => {
    return (
        <Fragment>
            <PDFViewer className="app" style={{ width: "100%", height: 500 }}>
                <Document>
                    <Page size="A4">
                        <View
                            style={{
                                ...styles.row,
                                backgroundColor: "#0f0f0f",
                                borderBottomLeftRadius: 12,
                                borderBottomRightRadius: 12,
                                paddingHorizontal: 24,
                                marginBottom: 12,
                            }}
                            fixed
                        >
                            <View>
                                <Image style={{ width: 160 }} src={require("../../assets/logo.png").default} />
                            </View>
                            <View>
                                <Text style={{ marginLeft: "auto", fontSize: 14, color: "#fff" }} src={require("../../assets/logo2.png").default}>
                                    +91 9904842410
                                </Text>
                            </View>
                        </View>
                        {data.map((row, idx) => (
                            <View
                                style={{
                                    ...styles.row2,
                                    paddingHorizontal: 24,
                                    marginVertical: 12,
                                }}
                            >
                                <View style={{ marginTop: 3 }}>
                                    <Text style={{ fontSize: 12 }}>{`${idx + 1}. ${row.location}`}</Text>
                                </View>
                                <View style={{ marginTop: 3 }}>
                                    <Text style={{ fontSize: 12 }}>{`Description: ${row.description}`}</Text>
                                </View>
                                <View style={{ marginTop: 6 }}>
                                    {row.images.length > 0 && (
                                        <Image style={{ height: 200, maxWidth: 380 }} src={`${process.env.REACT_APP_API_URL}/${row.images[0].imageUrl}`} />
                                    )}
                                </View>
                            </View>
                        ))}
                    </Page>
                </Document>
            </PDFViewer>
        </Fragment>
    );
};

export default AvailableTemplate;
