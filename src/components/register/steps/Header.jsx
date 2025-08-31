

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-6 gap-4">
            <div className="flex items-center gap-4">
                <img src="/logo.png" alt="Logo Université" className="h-12 w-auto" />
                <div>
                    <h2 className="text-xl font-bold text-blue-600">Université de Dschang</h2>
                    <p className="text-sm text-gray-600">Fiche d'inscription officielle</p>
                </div>
            </div>
            <div className="text-right text-sm text-gray-700">
                <p>Date : {new Date().toLocaleDateString('fr-FR')}</p>
                <p>Heure : {new Date().toLocaleTimeString('fr-FR')}</p>
            </div>
        </div>
    )
}
export default Header;