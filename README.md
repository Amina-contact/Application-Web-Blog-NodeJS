# Application-Web-Blog
Application Web (Blog) basée sur le framework Express avec accès à une base de données MySql.<br>
Le blog est réalisé sous forme d’une API et permet d’effectuer les opérations usuelles CRUD  pour toutes les entités le composant.<br>
# Les entités utilisées dans l’application sont :
    ●	User(id,username, email, password, role)
    ●	Article(id, title, content, published)
    ●	Comment(id, content)
    ●	Tag (id, name)
Le champ role peut avoir l’une de ces trois valeurs (admin, author ou guest).<br>
# Packages utilisés :
	● Express :framework web (le projet sera généré à l’aide la CLI express-generator)
	● Sequelize : ORM (Object Relational Mapping) avec le driver mysql ( mysql2)
	● Visual Studio Code avec l’extension Rest Client pour tester les routes


