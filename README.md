# Application-Web-Blog
Application Web (Blog) basée sur le framework Express avec accès à une base de données MySql.<br>
Le blog est réalisé sous forme d’une API et permet d’effectuer les opérations usuelles CRUD  pour toutes les entités le composant.<br>
# Les entités utilisées dans l’application sont :
    ●	User, (id:, username, email, password, role)<br>
    ●	Article, (id, title, content, published)<br>
    ●	Comment, (id, content)<br>
    ●	Tag (id, name)<br>
Le champ role peut avoir l’une de ces trois valeurs (admin, author ou guest).<br>
# Packages utilisés :
	<h3>Express :</h3> framework web (le projet sera généré à l’aide la CLI express-generator)<br>
	<h3>Middlewares Express :</h3> selon le besoin<br>
	Sequelize : ORM (Object Relational Mapping) avec le driver mysql ( mysql2)<br>
	Visual Studio Code avec l’extension Rest Client pour tester les routes<br>


