
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Upload, ChevronLeft, ChevronRight, Check, User, FileText, Users, Settings, X, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

const initialFormData= {
  email: "",
  motDePasse: "",
  confirmMotDePasse: "",
  nom: "",
  prenom: "",
  telephone: "",
  consentementCGU: false,
  sexe: "",
  dateNaissance: "",
  typeDocument: "",
  niveauEtude: "",
  universite: "",
  villeEtude: "",
  isParentBooking: false,
  nomParent: "",
  lienParente: "",
  telephoneParent: "",
  photoIdentite: null,
  pieceIdentite: null,
  cni: null,
}

const steps = [
  { id: 1, title: "Informations personnelles", icon: User },
  { id: 2, title: "Documents d'identité", icon: FileText },
  { id: 3, title: "Profil parental", icon: Users },
  { id: 4, title: "Confirmation", icon: Settings },
]

export function InscriptionMultiEtape() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<(initialFormData)
  const [errors, setErrors] = useState({})
  const [filePreviews, setFilePreviews] = useState({})

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    switch (step) {
      case 1:
        if (!formData.email) newErrors.email = "Email requis"
        if (!formData.email.includes("@")) newErrors.email = "Email invalide"
        if (!formData.motDePasse) newErrors.motDePasse = "Mot de passe requis"
        if (formData.motDePasse.length < 8) newErrors.motDePasse = "Minimum 8 caractères"
        if (formData.motDePasse !== formData.confirmMotDePasse)
          newErrors.confirmMotDePasse = "Les mots de passe ne correspondent pas"
        if (!formData.nom) newErrors.nom = "Nom requis"
        if (!formData.prenom) newErrors.prenom = "Prénom requis"
        if (!formData.sexe) newErrors.sexe = "Sexe requis"
        if (!formData.dateNaissance) newErrors.dateNaissance = "Date de naissance requise"
        if (!formData.niveauEtude) newErrors.niveauEtude = "Niveau d'étude requis"
        if (!formData.universite) newErrors.universite = "Université requise"
        if (!formData.villeEtude) newErrors.villeEtude = "Ville d'étude requise"
        break
      case 2:
        if (!formData.typeDocument) newErrors.typeDocument = "Type de document requis"
        if (!formData.photoIdentite) newErrors.photoIdentite = "Photo d'identité requise"
        if (!formData.pieceIdentite) newErrors.pieceIdentite = "Pièce d'identité requise"
        if (!formData.cni) newErrors.cni = "Document CNI requis"
        break
      case 3:
        if (formData.isParentBooking) {
          if (!formData.nomParent) newErrors.nomParent = "Nom du parent requis"
          if (!formData.lienParente) newErrors.lienParente = "Lien de parenté requis"
          if (!formData.telephoneParent) newErrors.telephoneParent = "Téléphone du parent requis"
        }
        break
    }

    setErrors(newErrors)
    console.log("Validation errors:", newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleFileUpload = (field, file) => {
    updateFormData(field, file)

    if (file) {
      // Generate preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setFilePreviews((prev) => ({
            ...prev,
            [field]: e.target?.result 
          }))
        }
        reader.readAsDataURL(file)
      } else {
        // For non-image files, remove any existing preview
        setFilePreviews((prev) => {
          const newPreviews = { ...prev }
          delete newPreviews[field]
          return newPreviews
        })
      }
    } else {
      // Remove preview when file is removed
      setFilePreviews((prev) => {
        const newPreviews = { ...prev }
        delete newPreviews[field]
        return newPreviews
      })
    }
  }

  const removeFile = (field) => {
    handleFileUpload(field, null)
  }

  const handleSubmit = () => {
    if (validateStep(currentStep) && formData.consentementCGU) {
      // Format data according to Prisma model
      const userData = {
        email: formData.email,
        motDePasse: formData.motDePasse,
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone,
        photoIdentiteUrl: formData.photoIdentite?.name || null,
        pieceIdentiteUrl: formData.pieceIdentite?.name || null,
        role: "ETUDIANT",
        consentementCGU: formData.consentementCGU,
        etudiant: {
          sexe: formData.sexe,
          dateNaissance: new Date(formData.dateNaissance),
          typeDocument: formData.typeDocument,
          cniUrl: formData.cni?.name || "",
          niveauEtude: formData.niveauEtude,
          universite: formData.universite,
          villeEtude: formData.villeEtude,
          profilParental: formData.isParentBooking
            ? {
                nom: formData.nomParent,
                lienParente: formData.lienParente,
                telephone: formData.telephoneParent,
              }
            : null,
        },
      }

      console.log("Données d'inscription:", userData)
      alert("Inscription réussie ! Vérifiez la console pour voir les données.")
    }
  }

  const FileUploadArea = ({
    field,
    label,
    accept = "image/*",
  }) => {
    const file = formData[field] 
    const preview = filePreviews[field]

    return (
      <div className="space-y-2">
        <Label htmlFor={field}>{label}</Label>
        <div
          className={cn(
            "border-2 border-dashed border-border rounded-lg transition-colors",
            "hover:border-accent hover:bg-accent/5",
            errors[field] && "border-destructive",
            file ? "p-4" : "p-6",
          )}
        >
          {file ? (
            <div className="space-y-3">
              {/* File info and remove button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium text-foreground">{file.name}</div>
                  <div className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(field)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Image preview */}
              {preview && (
                <div className="relative">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Aperçu"
                    className="max-w-full h-32 object-cover rounded-md border"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(preview, "_blank")}
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Replace file button */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById(field)?.click()}
                className="w-full"
              >
                Remplacer le fichier
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <div className="text-sm text-muted-foreground mb-2">
                Glissez-déposez votre fichier ou cliquez pour sélectionner
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById(field)?.click()}>
                Choisir un fichier
              </Button>
            </div>
          )}

          <input
            type="file"
            accept={accept}
            onChange={(e) => handleFileUpload(field, e.target.files?.[0] || null)}
            className="hidden"
            id={field}
          />
        </div>
        {errors[field] && <p className="text-sm text-destructive">{errors[field]}</p>}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Inscription Étudiant</h1>
        <p className="text-muted-foreground">Complétez votre inscription en quelques étapes simples</p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 overflow-x-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id

            return (
              <div key={step.id} className="flex items-center min-w-0">
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-colors flex-shrink-0",
                    isActive && "border-accent bg-accent text-accent-foreground",
                    isCompleted && "border-accent bg-accent text-accent-foreground",
                    !isActive && !isCompleted && "border-muted-foreground text-muted-foreground",
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn("w-12 md:w-20 h-0.5 mx-2 flex-shrink-0", isCompleted ? "bg-accent" : "bg-border")}
                  />
                )}
              </div>
            )
          })}
        </div>
        <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <div key={step.id} className="text-xs text-muted-foreground max-w-16 md:max-w-20 text-center">
              {step.title}
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5" })}
            {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription>
            Étape {currentStep} sur {steps.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motDePasse">Mot de passe *</Label>
                  <Input
                    id="motDePasse"
                    type="password"
                    value={formData.motDePasse}
                    onChange={(e) => updateFormData("motDePasse", e.target.value)}
                    className={errors.motDePasse ? "border-destructive" : ""}
                  />
                  {errors.motDePasse && <p className="text-sm text-destructive">{errors.motDePasse}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmMotDePasse">Confirmer le mot de passe *</Label>
                  <Input
                    id="confirmMotDePasse"
                    type="password"
                    value={formData.confirmMotDePasse}
                    onChange={(e) => updateFormData("confirmMotDePasse", e.target.value)}
                    className={errors.confirmMotDePasse ? "border-destructive" : ""}
                  />
                  {errors.confirmMotDePasse && <p className="text-sm text-destructive">{errors.confirmMotDePasse}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => updateFormData("nom", e.target.value)}
                    className={errors.nom ? "border-destructive" : ""}
                  />
                  {errors.nom && <p className="text-sm text-destructive">{errors.nom}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    value={formData.prenom}
                    onChange={(e) => updateFormData("prenom", e.target.value)}
                    className={errors.prenom ? "border-destructive" : ""}
                  />
                  {errors.prenom && <p className="text-sm text-destructive">{errors.prenom}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    value={formData.telephone}
                    onChange={(e) => updateFormData("telephone", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sexe">Sexe *</Label>
                  <Select value={formData.sexe} onValueChange={(value) => updateFormData("sexe", value)}>
                    <SelectTrigger className={errors.sexe ? "border-destructive" : ""}>
                      <SelectValue placeholder="Sélectionnez votre sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MASCULIN">Masculin</SelectItem>
                      <SelectItem value="FEMININ">Féminin</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.sexe && <p className="text-sm text-destructive">{errors.sexe}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateNaissance">Date de naissance *</Label>
                  <Input
                    id="dateNaissance"
                    type="date"
                    value={formData.dateNaissance}
                    onChange={(e) => updateFormData("dateNaissance", e.target.value)}
                    className={errors.dateNaissance ? "border-destructive" : ""}
                  />
                  {errors.dateNaissance && <p className="text-sm text-destructive">{errors.dateNaissance}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="niveauEtude">Niveau d'étude *</Label>
                  <Input
                    id="niveauEtude"
                    value={formData.niveauEtude}
                    onChange={(e) => updateFormData("niveauEtude", e.target.value)}
                    placeholder="Ex: Licence 3, Master 1..."
                    className={errors.niveauEtude ? "border-destructive" : ""}
                  />
                  {errors.niveauEtude && <p className="text-sm text-destructive">{errors.niveauEtude}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="universite">Université *</Label>
                  <Input
                    id="universite"
                    value={formData.universite}
                    onChange={(e) => updateFormData("universite", e.target.value)}
                    className={errors.universite ? "border-destructive" : ""}
                  />
                  {errors.universite && <p className="text-sm text-destructive">{errors.universite}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="villeEtude">Ville d'étude *</Label>
                  <Input
                    id="villeEtude"
                    value={formData.villeEtude}
                    onChange={(e) => updateFormData("villeEtude", e.target.value)}
                    className={errors.villeEtude ? "border-destructive" : ""}
                  />
                  {errors.villeEtude && <p className="text-sm text-destructive">{errors.villeEtude}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="typeDocument">Type de document *</Label>
                <Select value={formData.typeDocument} onValueChange={(value) => updateFormData("typeDocument", value)}>
                  <SelectTrigger className={errors.typeDocument ? "border-destructive" : ""}>
                    <SelectValue placeholder="Sélectionnez le type de document" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CNI">Carte Nationale d'Identité</SelectItem>
                    <SelectItem value="PASSEPORT">Passeport</SelectItem>
                    <SelectItem value="PERMIS_CONDUIRE">Permis de conduire</SelectItem>
                  </SelectContent>
                </Select>
                {errors.typeDocument && <p className="text-sm text-destructive">{errors.typeDocument}</p>}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FileUploadArea field="photoIdentite" label="Photo d'identité *" />
                <FileUploadArea field="pieceIdentite" label="Pièce d'identité *" />
              </div>

              <FileUploadArea field="cni" label="Document CNI *" accept=".pdf,.jpg,.jpeg,.png" />

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Formats acceptés :</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Images : JPG, JPEG, PNG (max 5MB)</li>
                  <li>• Documents : PDF (max 10MB)</li>
                  <li>• Assurez-vous que les documents sont lisibles</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="isParentBooking"
                    checked={formData.isParentBooking}
                    onCheckedChange={(checked) => {
                      updateFormData("isParentBooking", checked)
                      // Clear parent fields if unchecked
                      if (!checked) {
                        updateFormData("nomParent", "")
                        updateFormData("lienParente", "")
                        updateFormData("telephoneParent", "")
                      }
                    }}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="isParentBooking" className="text-sm font-medium">
                      Un parent/tuteur effectue cette réservation pour son enfant
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Cochez cette case si vous êtes un parent ou tuteur légal qui réserve une chambre pour votre
                      enfant. Les informations parentales ne sont requises que dans ce cas.
                    </p>
                  </div>
                </div>
              </div>

              {formData.isParentBooking && (
                <div className="space-y-4 border-l-4 border-accent pl-4">
                  <h4 className="font-medium text-accent">Informations du parent/tuteur</h4>

                  <div className="space-y-2">
                    <Label htmlFor="nomParent">Nom du parent/tuteur *</Label>
                    <Input
                      id="nomParent"
                      value={formData.nomParent}
                      onChange={(e) => updateFormData("nomParent", e.target.value)}
                      className={errors.nomParent ? "border-destructive" : ""}
                    />
                    {errors.nomParent && <p className="text-sm text-destructive">{errors.nomParent}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lienParente">Lien de parenté *</Label>
                    <Select
                      value={formData.lienParente}
                      onValueChange={(value) => updateFormData("lienParente", value)}
                    >
                      <SelectTrigger className={errors.lienParente ? "border-destructive" : ""}>
                        <SelectValue placeholder="Sélectionnez le lien de parenté" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PERE">Père</SelectItem>
                        <SelectItem value="MERE">Mère</SelectItem>
                        <SelectItem value="TUTEUR">Tuteur légal</SelectItem>
                        <SelectItem value="AUTRE">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.lienParente && <p className="text-sm text-destructive">{errors.lienParente}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telephoneParent">Téléphone du parent/tuteur *</Label>
                    <Input
                      id="telephoneParent"
                      value={formData.telephoneParent}
                      onChange={(e) => updateFormData("telephoneParent", e.target.value)}
                      className={errors.telephoneParent ? "border-destructive" : ""}
                    />
                    {errors.telephoneParent && <p className="text-sm text-destructive">{errors.telephoneParent}</p>}
                  </div>
                </div>
              )}

              {!formData.isParentBooking && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Les informations parentales ne sont pas requises pour cette inscription.</p>
                  <p className="text-sm mt-2">Vous pouvez passer à l'étape suivante.</p>
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Récapitulatif de votre inscription</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-accent mb-2">Informations personnelles</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Email:</span> {formData.email}
                      </p>
                      <p>
                        <span className="font-medium">Nom:</span> {formData.nom}
                      </p>
                      <p>
                        <span className="font-medium">Prénom:</span> {formData.prenom}
                      </p>
                      <p>
                        <span className="font-medium">Téléphone:</span> {formData.telephone || "Non renseigné"}
                      </p>
                      <p>
                        <span className="font-medium">Sexe:</span> {formData.sexe}
                      </p>
                      <p>
                        <span className="font-medium">Date de naissance:</span> {formData.dateNaissance}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-accent mb-2">Informations académiques</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Niveau d'étude:</span> {formData.niveauEtude}
                      </p>
                      <p>
                        <span className="font-medium">Université:</span> {formData.universite}
                      </p>
                      <p>
                        <span className="font-medium">Ville d'étude:</span> {formData.villeEtude}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <h4 className="font-medium text-accent mb-3">Documents téléchargés</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Photo d'identité */}
                      <div className="border rounded-lg p-3">
                        <div className="text-sm font-medium mb-2">Photo d'identité</div>
                        {formData.photoIdentite ? (
                          <div className="space-y-2">
                            {filePreviews.photoIdentite && (
                              <img
                                src={filePreviews.photoIdentite || "/placeholder.svg"}
                                alt="Photo d'identité"
                                className="w-full h-24 object-cover rounded border"
                              />
                            )}
                            <div className="text-xs text-muted-foreground">{formData.photoIdentite.name}</div>
                            <div className="text-xs text-green-600">✓ Téléchargée</div>
                          </div>
                        ) : (
                          <div className="text-xs text-destructive">✗ Manquante</div>
                        )}
                      </div>

                      {/* Pièce d'identité */}
                      <div className="border rounded-lg p-3">
                        <div className="text-sm font-medium mb-2">Pièce d'identité</div>
                        {formData.pieceIdentite ? (
                          <div className="space-y-2">
                            {filePreviews.pieceIdentite && (
                              <img
                                src={filePreviews.pieceIdentite || "/placeholder.svg"}
                                alt="Pièce d'identité"
                                className="w-full h-24 object-cover rounded border"
                              />
                            )}
                            <div className="text-xs text-muted-foreground">{formData.pieceIdentite.name}</div>
                            <div className="text-xs text-green-600">✓ Téléchargée</div>
                          </div>
                        ) : (
                          <div className="text-xs text-destructive">✗ Manquante</div>
                        )}
                      </div>

                      {/* Document CNI */}
                      <div className="border rounded-lg p-3">
                        <div className="text-sm font-medium mb-2">Document CNI</div>
                        {formData.cni ? (
                          <div className="space-y-2">
                            {filePreviews.cni && (
                              <img
                                src={filePreviews.cni || "/placeholder.svg"}
                                alt="Document CNI"
                                className="w-full h-24 object-cover rounded border"
                              />
                            )}
                            <div className="text-xs text-muted-foreground">{formData.cni.name}</div>
                            <div className="text-xs text-green-600">✓ Téléchargé</div>
                          </div>
                        ) : (
                          <div className="text-xs text-destructive">✗ Manquant</div>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Type de document: <span className="font-medium">{formData.typeDocument}</span>
                    </div>
                  </div>

                  {formData.isParentBooking && (
                    <div className="lg:col-span-2">
                      <h4 className="font-medium text-accent mb-2">Contact parental</h4>
                      <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Nom:</span> {formData.nomParent}
                          </div>
                          <div>
                            <span className="font-medium">Lien de parenté:</span> {formData.lienParente}
                          </div>
                          <div>
                            <span className="font-medium">Téléphone:</span> {formData.telephoneParent}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="consentementCGU"
                  checked={formData.consentementCGU}
                  onCheckedChange={(checked) => updateFormData("consentementCGU", checked)}
                />
                <Label htmlFor="consentementCGU" className="text-sm">
                  J'accepte les conditions générales d'utilisation et la politique de confidentialité *
                </Label>
              </div>

              {!formData.consentementCGU && (
                <p className="text-sm text-destructive">Vous devez accepter les CGU pour continuer</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2 bg-transparent order-2 sm:order-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </Button>

        {currentStep < steps.length ? (
          <Button onClick={nextStep} className="flex items-center gap-2 order-1 sm:order-2">
            Suivant
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!formData.consentementCGU}
            className="flex items-center gap-2 order-1 sm:order-2"
          >
            <Check className="w-4 h-4" />
            Finaliser l'inscription
          </Button>
        )}
      </div>
    </div>
  )
}
