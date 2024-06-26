document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('input[name="title"]');
    const ul = document.querySelector('ul');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = input.value.trim();

        if (title) {
            fetch('/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `title=${encodeURIComponent(title)}`,
            }).then(response => response.text())
              .then(() => {
                const li = document.createElement('li');
                li.textContent = title;
                const a = document.createElement('a');
                a.textContent = 'Delete';
                a.href = '#';
                a.style.marginLeft = '10px';
                li.appendChild(a);
                ul.appendChild(li);
                input.value = '';

                a.addEventListener('click', function() {
                    ul.removeChild(li);
                    fetch(`/delete?id=${li.dataset.id}`, { method: 'GET' });
                });
            });
        }
    });

    document.querySelectorAll('ul li a').forEach(link => {
        link.addEventListener('click', function(event) {
            const li = link.parentElement;
            ul.removeChild(li);
            fetch(`/delete?id=${li.dataset.id}`, { method: 'GET' });
        });
    });
});
