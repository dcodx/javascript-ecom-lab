CREATE TABLE `contacts` (
    `id` int,
    `firstname` VARCHAR(255),
    `lastname` VARCHAR(255), 
    `email` VARCHAR(255), 
    `subject` VARCHAR(255), 
    `message` VARCHAR(255)
);


CREATE TABLE `orders` (
    `id` int,
    `token` VARCHAR(255),
    `total` FLOAT, 
    `date` VARCHAR(255), 
    `userId` INT, 
    `products` VARCHAR(255)
);


CREATE TABLE `products` (
    `id` INT, 
    `name` VARCHAR(255), 
    `price` FLOAT, 
    `img` VARCHAR(255), 
    `desc` VARCHAR(10000), 
    `stars` INT
);

CREATE TABLE `reviews` (`id` INT, `productId` INT, `userId` INT, `desc` VARCHAR(10000), `stars` INT);
CREATE TABLE `users` (`id` INT, `fullname` VARCHAR(255), `email` VARCHAR(255), `password` VARCHAR(255), `admin` VARCHAR(255));

INSERT INTO `contacts` (`id`, `firstname`, `lastname`, `email`, `subject`, `message`) VALUES (1, "info", "info", "info@info.com", "My Account", "sssssssssssss");
INSERT INTO `orders` (`id`, `token`, `total`, `date`, `userId`, `products`) VALUES (20, "tok_1KfrrAKwJxGhyCisUYnDAe6Y", 300.89, "1647894579333", 1, "1"), (21, "tok_1KfrrxKwJxGhyCis62UVCzak", 12.99, "1647894628467", 1, "2");
INSERT INTO `products` (`id`, `name`, `price`, `img`, `desc`, `stars`) VALUES (1, "Shoulder Hoodiee", 300.89, "https://img.ltwebstatic.com/images3_pi/2021/11/02/16358203804c37f790cfe524d2a8c49e2a1575ecde_thumbnail_600x.webp", "good product", 4), (2, "Men Letter Graphic Polo Shirt", 12.99, "https://img.ltwebstatic.com/images3_pi/2021/12/31/1640918734cb9f17c88865a46d6273b7546ee42c72_thumbnail_600x.webp", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap in", 4), (3, "Sweatshirt & Slant Pocket Sweatpants", 15.99, "https://img.ltwebstatic.com/images3_pi/2021/10/11/1633918242907b64424f63b665f881b75616e65750_thumbnail_600x.webp", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a", 3), (4, "Homme Jean déchiré zippé", 20.89, "https://img.ltwebstatic.com/images3_pi/2022/02/07/16442124321790cfb53ef9db82b88a14e7e1ee4007_thumbnail_600x.webp", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a", 5), (5, "Shoulder Top & Joggers Set", 12.99, "https://img.ltwebstatic.com/images3_pi/2021/01/28/1611800667b518d7d84888b170f576ff3a105bcf80_thumbnail_600x.webp", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a", 2);
INSERT INTO `reviews` (`id`, `productId`, `userId`, `desc`, `stars`) VALUES (15, 1, 1, "good product", 5), (16, 2, 1, "wewe", 5);
INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `admin`) VALUES (1, "admin", "admin@admin.com", "$2b$10$7kRLq/GBpXUextUSkpXd1uzMXJzhZkM/5XcByvG8SX/vfoKMmo2zK", "1"), (2, "user", "user@user.com", "$2b$10$QMbOSMJGcTWa6izBNBe.fuZMJtlcMzojp38xuVaHzGztaCRVJbT8y", "0"),(8, "admin", "admin@gmail.com", "$2b$10$7kRLq/GBpXUextUSkpXd1uzMXJzhZkM/5XcByvG8SX/vfoKMmo2zK", "1");
