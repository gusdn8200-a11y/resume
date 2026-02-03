(function () {
			const modal = document.getElementById('videoModal');
			const video = document.getElementById('modalVideo');
			const bgItems = document.querySelectorAll('article .bg');
			const closeTargets = modal.querySelectorAll('[data-close="modal"]');

			function openModal(src) {
				if (!src) return;
				video.src = src;
				modal.classList.add('is-open');
				modal.setAttribute('aria-hidden', 'false');
				video.play().catch(() => {});
			}

			function closeModal() {
				modal.classList.remove('is-open');
				modal.setAttribute('aria-hidden', 'true');
				video.pause();
				video.removeAttribute('src');
				video.load();
			}

			bgItems.forEach((item) => {
				item.addEventListener('click', () => {
					openModal(item.getAttribute('data-video'));
				});
			});

			closeTargets.forEach((target) => {
				target.addEventListener('click', closeModal);
			});

			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape' && modal.classList.contains('is-open')) {
					closeModal();
				}
			});
		})();