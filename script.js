const cursor = document.querySelector('.cursor');
        const images = [
            'https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/671658/pexels-photo-671658.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600'
        ];
        
        let currentImageIndex = 0;
        let lastDropTime = 0;
        const DROP_INTERVAL = 150; // Time between drops in milliseconds

        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1
            });

            const currentTime = Date.now();
            if (currentTime - lastDropTime > DROP_INTERVAL) {
                dropImage(e.clientX, e.clientY);
                lastDropTime = currentTime;
            }
        });

        function dropImage(x, y) {
            const img = document.createElement('img');
            img.className = 'cursor-image';
            img.src = images[currentImageIndex];
            document.body.appendChild(img);

            // Set initial position
            gsap.set(img, {
                x: x - 50,
                y: y - 50,
                scale: 0,
                opacity: 0,
                rotation: gsap.utils.random(-30, 30)
            });

            // Animate in
            gsap.to(img, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.5)"
            });

            // Animate out
            gsap.to(img, {
                scale: 0.5,
                opacity: 0,
                y: y + gsap.utils.random(50, 100),
                rotation: gsap.utils.random(-45, 45),
                duration: 0.6,
                delay: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    img.remove();
                }
            });

            // Update image index
            currentImageIndex = (currentImageIndex + 1) % images.length;
        }