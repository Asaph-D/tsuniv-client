
const Home = ()=> {



  return (
    <div>
           <h1>Trouvez votre logement idéal près de votre université</h1>
           <h3>Des milliers de logements étudiants vérifiés, des colocations sympa, 
            et des services dédiés pour faciliter votre vie universitaire.</h3>

            <div>
                   <form className="flex items-center gap-4 w-6/12">
                        <input type="text" id="universities" placeholder="Rechercher un logement" 
                        className="input input-bordered w-full max-w-xs" />
                        <label for="type">Type de logement :</label>
                        <select id="type" name="type" className="select select-bordered w-full
                        max-w-xs">
                            <option value="appartement">Appartement</option>
                            <option value="colocation">Colocation</option>
                            <option value="studio">Studio</option>
                            <option value="chambre">Chambre</option>
                        </select>

                        <button className="btn bg-amber-600 text-amber-50">Rechercher</button>
                   </form>
            </div>
    </div>
  )
}

export default Home;
