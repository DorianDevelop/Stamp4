import pandas as pd
import tkinter as tk
from tkinter import simpledialog, messagebox, PhotoImage
from datetime import datetime
import subprocess
import os
#Tout les fichiers
fichier_csv = 'C:/Users/thewa/Downloads/EV/REF COMM.csv'
fichier_compteur = "C:/Users/thewa/Downloads/EV/product_counter.txt"
image_1_carte = 'C:/Users/thewa/Downloads/EV/One.png'
image_2_carte = 'C:/Users/thewa/Downloads/EV/Two.png'
script_link = "C:/Users/thewa/Downloads/EV/launch.bat"

# Récupère le compteur de produits du jour
def obtenir_compteur_produits():
    aujourd_hui = datetime.now().strftime("%Y-%m-%d")
    if os.path.exists(fichier_compteur):
        with open(fichier_compteur, "r") as fichier:
            contenu = fichier.read().strip()
            if contenu:
                try:
                    date_sauvegardee, compteur = contenu.split(',')
                    if date_sauvegardee == aujourd_hui:
                        return int(compteur), aujourd_hui
                    else:
                        return 1, aujourd_hui
                except ValueError:
                    return 1, aujourd_hui
            else:
                return 1, aujourd_hui
    else:
        return 1, aujourd_hui

# Sauvegarde le compteur de produits
def sauvegarder_compteur_produits(compteur, date):
    with open(fichier_compteur, "w") as fichier:
        fichier.write(f"{date},{compteur}")

# Génère un numéro de série unique basé sur les initiales
def generer_numero_serie(initiales):
    maintenant = datetime.now()
    semaine = maintenant.isocalendar()[1]
    jour_semaine = maintenant.isoweekday()
    compteur_produit, aujourd_hui = obtenir_compteur_produits()
    partie_increment = f"{compteur_produit:03}_{compteur_produit:03}"
    partie_additionnelle = "65_43_21_0"
    partie_date = f"{maintenant.year % 100}{semaine:02d}{jour_semaine}"
    numero_serie = f"{initiales}_{partie_date}_00_{partie_increment}_{partie_additionnelle}"
    return numero_serie

# Utilisation de la fonction pour obtenir les initiales de l'utilisateur
initiales = simpledialog.askstring("Entree", "Entrez vos initiales (exemple : DF)")
if initiales is None:
    messagebox.showinfo("Sortie", "Operation annulee.")
    exit()

numero_serie = generer_numero_serie(initiales)

# Charger le fichier CSV dans un DataFrame pandas
df = pd.read_csv(fichier_csv, delimiter=';')

# Demande de la référence à l'utilisateur
root = tk.Tk()
root.withdraw()
reference = simpledialog.askstring("Entree", "Entrez la reference :")

if reference is None:
    messagebox.showinfo("Sortie", "Operation annulee.")
    root.destroy()
    exit()

# Vérifier si la référence existe dans le DataFrame
nom_colonne = 'REF COMM'
colonne_nb_carte = 'Nb carte'

if reference in df[nom_colonne].values:
    valeur_nb_carte = df.loc[df[nom_colonne] == reference, colonne_nb_carte].iloc[0]
else:
    messagebox.showinfo("Resultat", "Reference manquante")
    root.destroy()
    exit()

# Actions des boutons
def action_continuer():
    compteur_produit, aujourd_hui = obtenir_compteur_produits()
    sauvegarder_compteur_produits(compteur_produit + 1, aujourd_hui)
    commande = [script_link, reference, numero_serie]
    resultat = subprocess.run(commande, capture_output=True, text=True)
    print("Sortie :", resultat.stdout)
    print("Erreurs :", resultat.stderr)
    print("Code de retour :", resultat.returncode)
    messagebox.showinfo("Resultat", "TOUT EST BON.")
    fenetre.destroy()
    root.destroy()

def action_quitter():
    fenetre.destroy()
    root.destroy()

# Choisir l'image selon le nombre de cartes
if valeur_nb_carte == 1:
    fichier_image = image_1_carte
elif valeur_nb_carte == 2:
    fichier_image = image_2_carte
else:
    messagebox.showinfo("Resultat", f"Valeur Nb carte inattendue : {valeur_nb_carte}")

# Créer une nouvelle fenêtre pour afficher l'image et les boutons
fenetre = tk.Toplevel()
fenetre.title("Information cablage")
image = PhotoImage(file=fichier_image)
etiquette = tk.Label(fenetre, image=image)
etiquette.pack()

# Créer les boutons
cadre_continuer = tk.Frame(fenetre, bg="blue", bd=2)
cadre_continuer.pack(side=tk.LEFT, padx=5, pady=5)
bouton_continuer = tk.Button(cadre_continuer, text="Cablage valide !", command=action_continuer, bg="white", fg="blue", bd=1, relief="raised")
bouton_continuer.pack(padx=1, pady=1)

cadre_quitter = tk.Frame(fenetre, bg="red", bd=2)
cadre_quitter.pack(side=tk.RIGHT, padx=5, pady=5)
bouton_quitter = tk.Button(cadre_quitter, text="Fermer", command=action_quitter, bg="white", fg="red", bd=1, relief="raised")
bouton_quitter.pack(padx=1, pady=1)

fenetre.mainloop()