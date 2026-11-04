import {
	ROLES,
	type Player,
	type Role,
} from '@/features/undercover/undercover.type'

import { shuffle } from '@/utils/shuffle'

export const WORDS: [string, string][] = [
	['Pizza', 'Burger'],
	['Café', 'Thé'],
	['Croissant', 'Chocolatine'],
	['Fromage', 'Beurre'],
	['Pomme', 'Poire'],
	['Fraise', 'Framboise'],
	['Citron', 'Orange'],
	['Chocolat', 'Caramel'],
	['Crêpe', 'Gaufre'],
	['Pâtes', 'Riz'],
	['Glace', 'Sorbet'],
	['Ketchup', 'Mayonnaise'],
	['Vin', 'Bière'],
	['Soupe', 'Purée'],
	['Tomate', 'Poivron'],
	['Banane', 'Mangue'],
	['Miel', 'Confiture'],
	["Jus d'orange", 'Limonade'],
	['Frites', 'Chips'],
	['Chat', 'Chien'],
	['Lion', 'Tigre'],
	['Loup', 'Renard'],
	['Dauphin', 'Requin'],
	['Abeille', 'Guêpe'],
	['Cheval', 'Âne'],
	['Hibou', 'Chouette'],
	['Crocodile', 'Alligator'],
	['Papillon', 'Libellule'],
	['Poule', 'Canard'],
	['Lapin', 'Lièvre'],
	['Grenouille', 'Crapaud'],
	['Pingouin', 'Manchot'],
	['Souris', 'Rat'],
	['Plage', 'Piscine'],
	['Montagne', 'Colline'],
	['Forêt', 'Jungle'],
	['Hôpital', 'Clinique'],
	['Restaurant', 'Cantine'],
	['Cinéma', 'Théâtre'],
	['Musée', 'Galerie'],
	['Gare', 'Aéroport'],
	['Boulangerie', 'Pâtisserie'],
	['École', 'Université'],
	['Bibliothèque', 'Librairie'],
	['Camping', 'Hôtel'],
	['Désert', 'Savane'],
	['Château', 'Palais'],
	['Stylo', 'Crayon'],
	['Téléphone', 'Tablette'],
	['Fourchette', 'Cuillère'],
	['Lampe', 'Bougie'],
	['Parapluie', 'Imperméable'],
	['Clé', 'Cadenas'],
	['Montre', 'Réveil'],
	['Lunettes', 'Lentilles'],
	['Oreiller', 'Couette'],
	['Brosse à dents', 'Dentifrice'],
	['Ciseaux', 'Couteau'],
	['Miroir', 'Fenêtre'],
	['Sac à dos', 'Valise'],
	['Chaise', 'Tabouret'],
	['Télévision', 'Ordinateur'],
	['Ballon', 'Frisbee'],
	['Voiture', 'Moto'],
	['Train', 'Métro'],
	['Avion', 'Hélicoptère'],
	['Vélo', 'Trottinette'],
	['Bateau', 'Sous-marin'],
	['Bus', 'Tramway'],
	['Taxi', 'VTC'],
	['Fusée', 'Satellite'],
	['Chaussettes', 'Chaussons'],
	['Casquette', 'Bonnet'],
	['Jean', 'Jogging'],
	['Écharpe', 'Cravate'],
	['Robe', 'Jupe'],
	['Baskets', 'Sandales'],
	['Pull', 'Sweat'],
	['Gants', 'Moufles'],
	['Football', 'Rugby'],
	['Tennis', 'Badminton'],
	['Ski', 'Snowboard'],
	['Natation', 'Plongée'],
	['Basket', 'Handball'],
	['Boxe', 'Judo'],
	['Yoga', 'Pilates'],
	['Échecs', 'Dames'],
	['Cartes', 'Dés'],
	['Puzzle', 'Mots croisés'],
	['Guitare', 'Violon'],
	['Piano', 'Orgue'],
	['Chanteur', 'Rappeur'],
	['Roman', 'Bande dessinée'],
	['Film', 'Série'],
	['Médecin', 'Infirmier'],
	['Pompier', 'Policier'],
	['Boulanger', 'Cuisinier'],
	['Professeur', 'Directeur'],
	['Pilote', 'Astronaute'],
	['Brioche', 'Pain de mie'],
	['Yaourt', 'Fromage blanc'],
	['Ananas', 'Noix de coco'],
	['Cerise', 'Myrtille'],
	['Carotte', 'Navet'],
	['Kebab', 'Tacos'],
	['Popcorn', 'Barbe à papa'],
	['Omelette', 'Œuf au plat'],
	['Salade', 'Taboulé'],
	['Lasagnes', 'Hachis parmentier'],
	['Muffin', 'Cupcake'],
	['Mojito', 'Spritz'],
	['Eau gazeuse', 'Eau plate'],
	['Steak', 'Côtelette'],
	['Girafe', 'Zèbre'],
	['Kangourou', 'Koala'],
	['Ours', 'Panda'],
	['Mouton', 'Chèvre'],
	['Vache', 'Taureau'],
	['Perroquet', 'Toucan'],
	['Méduse', 'Étoile de mer'],
	['Fourmi', 'Termite'],
	['Serpent', 'Lézard'],
	['Phoque', 'Otarie'],
	['Canapé', 'Fauteuil'],
	['Douche', 'Baignoire'],
	['Frigo', 'Congélateur'],
	['Four', 'Micro-ondes'],
	['Balai', 'Aspirateur'],
	['Rideau', 'Volet'],
	['Tapis', 'Paillasson'],
	['Grenier', 'Cave'],
	['Pluie', 'Neige'],
	['Orage', 'Tempête'],
	['Soleil', 'Lune'],
	['Rivière', 'Lac'],
	['Volcan', 'Geyser'],
	['Rose', 'Tulipe'],
	['Sapin', 'Chêne'],
	['Arc-en-ciel', 'Aurore boréale'],
	['Cahier', 'Classeur'],
	['Gomme', 'Correcteur'],
	['Réunion', 'Entretien'],
	['Vacances', 'Week-end'],
	['Anniversaire', 'Mariage'],
	['Halloween', 'Carnaval'],
	['Rhume', 'Grippe'],
	['Dentiste', 'Opticien'],
	['Pansement', 'Plâtre'],
	["Parc d'attractions", 'Zoo'],
	['Pique-nique', 'Barbecue'],
	['Cirque', 'Fête foraine'],
	['Escape game', 'Laser game'],
	['Selfie', 'Portrait'],
	['Jeu de société', 'Jeu vidéo'],
	['Timidité', 'Discrétion'],
	['Curiosité', 'Indiscrétion'],
	['Gratitude', 'Reconnaissance'],
	['Stress', 'Angoisse'],
	['Rire', 'Sourire'],
]

export function pickWords(): { civil: string; undercover: string } {
	const [a, b] = WORDS[Math.floor(Math.random() * WORDS.length)]

	return Math.random() < 0.5
		? { civil: a, undercover: b }
		: { civil: b, undercover: a }
}

export function pickRoles(
	civils: number,
	undercovers: number,
	mister: number,
): Role[] {
	return shuffle([
		...Array.from({ length: civils }, () => ROLES.CIVIL),
		...Array.from({ length: undercovers }, () => ROLES.UNDERCOVER),
		...Array.from({ length: mister }, () => ROLES.MISTER),
	])
}

export function pickWinner(players: Player[]): Role | null {
	const alive = players.filter((player) => !player.die)

	const civils = alive.filter((p) => p.role === ROLES.CIVIL).length
	const undercovers = alive.filter((p) => p.role === ROLES.UNDERCOVER).length
	const misters = alive.filter((p) => p.role === ROLES.MISTER).length

	if (undercovers === 0 && misters === 0) return ROLES.CIVIL
	if (undercovers > 0 && civils <= undercovers) return ROLES.UNDERCOVER
	if (undercovers === 0 && civils <= misters) return ROLES.MISTER

	return null
}

export function normalize(value: string): string {
	return value
		.trim()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
}
