

const Erreur = () => {
  return (
    <div className="erreur-container">
        <h1 className="text-4xl font-bold text-center mt-10 text-error">Page Non Trouvée</h1>
        <p className="text-center mt-4">Désolé, la page que vous recherchez n'existe pas.</p>
        <p className="text-center mt-2">Veuillez vérifier l'URL ou retourner à la page d'accueil.</p>

    </div>
  );
}

export default Erreur;