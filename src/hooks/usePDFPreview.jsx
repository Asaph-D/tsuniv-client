// components/documents/DocumentPDF.jsx
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';

// Génère le QR code en base64
const generateQRCode = (text) => {
    return new Promise((resolve) => {
        QRCode.toDataURL(text, { errorCorrectionLevel: 'H', scale: 8 }, (err, url) => {
            if (err) {
                console.error('Erreur QR:', err);
                resolve(null);
            } else {
                resolve(url);
            }
        });
    });
};

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderBottom: 1,
        borderBottomColor: '#e5e7eb',
        paddingBottom: 10,
    },
    titleSection: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e40af',
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 10,
        color: '#6b7280',
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1e40af',
        marginBottom: 8,
    },
    text: {
        fontSize: 10,
        marginBottom: 4,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '30%',
        marginBottom: 10,
    },
    badge: {
        fontSize: 8,
        backgroundColor: '#22c55e',
        color: '#ffffff',
        padding: 2,
        borderRadius: 4,
        marginTop: 4,
        textAlign: 'center',
    },
    signatureContainer: {
        marginTop: 30,
        paddingTop: 15,
        borderTop: 1,
        borderTopColor: '#d1d5db',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    signatureBlock: {
        fontSize: 10,
    },
    signatureLabel: {
        fontWeight: 'bold',
        marginBottom: 6,
    },
    qrCodeContainer: {
        textAlign: 'center',
        marginTop: 10,
    },
    qrCodeText: {
        fontSize: 9,
        color: '#6b7280',
        marginBottom: 5,
    },
    qrCodeImage: {
        width: 100,
        height: 100,
    },
    pieceIdentiteImage: {
        width: '100%',
        height: 'auto',
        maxHeight: 200,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 6,
    },
});

const DocumentPDF = ({ formData }) => {
    const signatoryName = 'Merveille Belinga';
    const signatoryRole = 'Étudiant';

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={{ textAlign: 'center', flex: 1 }}>
                        <Text style={styles.titleSection}>Université de Dschang</Text>
                        <Text style={styles.subTitle}>Fiche d'inscription officielle</Text>
                        <Text style={styles.subTitle}>Date : {new Date().toLocaleDateString('fr-FR')}</Text>
                    </View>
                </View>

                {/* Informations personnelles */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informations personnelles</Text>
                    <Text style={styles.text}>Nom : {formData.nom}</Text>
                    <Text style={styles.text}>Prénoms : {formData.prenom}</Text>
                    <Text style={styles.text}>Email : {formData.email}</Text>
                    <Text style={styles.text}>Téléphone : {formData.telephone}</Text>
                    <Text style={styles.text}>Sexe : {formData.sexe}</Text>
                    <Text style={styles.text}>
                        Date de naissance : {new Date(formData.dateNaissance).toLocaleDateString('fr-FR')}
                    </Text>
                </View>

                {/* Documents */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Documents téléchargés</Text>
                    <View style={styles.gridContainer}>
                        {[
                            { field: 'photoIdentite', label: "Photo d'identité" },
                            { field: 'pieceIdentite', label: 'Pièce d’identité' },
                            { field: 'cni', label: 'Document CNI' },
                        ].map(({ field, label }) => (
                            <View key={field} style={styles.gridItem}>
                                <Text style={{ fontSize: 9, fontWeight: 'medium' }}>{label}</Text>
                                {formData[field] ? (
                                    <>
                                        <Text style={{ fontSize: 8, marginTop: 4 }}>{formData[field].name}</Text>
                                        <View style={styles.badge}>
                                            <Text>✓ Téléchargé</Text>
                                        </View>
                                    </>
                                ) : (
                                    <View style={{ fontSize: 8, color: '#ef4444', marginTop: 4 }}>
                                        <Text>✗ Manquant</Text>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                {/* Pièce d'identité - Aperçu en image */}
                {formData.pieceIdentiteSrc && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Pièce d’identité (copie)</Text>
                        <Image style={styles.pieceIdentiteImage} src={formData.pieceIdentiteSrc} />
                    </View>
                )}

                {/* Contact parental */}
                {formData.isParentBooking && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Contact parental</Text>
                        <Text style={styles.text}>Nom : {formData.nomParent}</Text>
                        <Text style={styles.text}>Lien : {formData.lienParente}</Text>
                        <Text style={styles.text}>Téléphone : {formData.telephoneParent}</Text>
                    </View>
                )}

                {/* Signature + QR Code */}
                <View style={styles.signatureContainer}>
                    <View style={styles.signatureBlock}>
                        <Text style={styles.signatureLabel}>Signature électronique :</Text>
                        <Text>Nom : {signatoryName}</Text>
                        <Text>Rôle : {signatoryRole}</Text>
                        <Text>Date : {new Date().toLocaleDateString('fr-FR')}</Text>
                    </View>

                    <View style={styles.qrCodeContainer}>
                        <Text style={styles.qrCodeText}>Scan pour confirmer l'authenticité</Text>
                        <Image
                            src={async () => {
                                const url = await generateQRCode(`https://universite-dschang.cm/verif?dossier=${formData.id || '123456'}`);
                                return url;
                            }}
                            style={styles.qrCodeImage}
                        />
                    </View>
                </View>
            </Page>
        </Document>
    );
};



export default DocumentPDF;