const uploadButton = document.getElementById('upload-button');
const uploadInput = document.getElementById('image-upload');

uploadButton.addEventListener('click', () => {
    uploadInput.click();
});

function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve({ url: reader.result, name: file.name });
        }

        reader.onerror = () => {
            reject(`Erro na leitura do arquivo ${file.name}`);
        }

        reader.readAsDataURL(file);
    });
}

const mainImage = document.querySelector('.main-image');
const imageName = document.querySelector('.image-name-container p');

uploadInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (file) {
        try {
            const fileContent = await readFileContent(file);
            mainImage.src = fileContent.url;
            imageName.textContent = fileContent.name;
        } catch (error) {
            console.error('Error reading file');
        }
    }
});

const tagsInput = document.getElementById('tags-input');
const tagsList = document.getElementById('tags-list');

tagsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-tag')) {
        const tag = event.target.parentElement;
        tagsList.removeChild(tag);
    }
});

const availableTags = ['Front-end', 'Back-end', 'Database', 'FullStack', 'DevOps', 'Programming', 'Java', 'C', 'C#', 'React', 'Javascript', 'Typescript', 'Node.js', 'Next.js', 'CSS', 'HTML', 'Go', 'Python', 'SQL Server', 'MongoDB', 'MySQL', 'API', 'Data Science', 'AI', 'Machine Learning']

async function verifyAvailableTags(tagText) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(availableTags.includes(tagText));
        }, 1000);
    });
}

tagsInput.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const tagText = tagsInput.value.trim();
        if (tagText !== '') {
            try {
                const tagExists = await verifyAvailableTags(tagText);

                if (!tagExists) return alert('Essa tag não pode ser utilizada');

                const newTag = document.createElement('li');
                newTag.innerHTML = `<p>${tagText}</p> <img src="./img/close-black.svg" class="remove-tag">`
                tagsList.appendChild(newTag);
                tagsInput.value = '';

            } catch (error) {
                console.error(error);
                alert('Erro ao verificar a existência da tag.')
            }
        }
    }
});

const publishButton = document.querySelector('.publish-button');

function publishProject(projectName, projectDescription, projectTags) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const ok = Math.random() > 0.5;

            if (ok) {
                resolve('Projeto publicado com sucesso!');
            } else {
                reject('Erro ao publicar projeto.');
            }
        }, 2000);
    });
};

publishButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const projectName = document.getElementById('name').value;
    const projectDescription = document.getElementById('description').value;
    const projectTags = Array.from(tagsList.querySelectorAll('p')).map((tag) => tag.textContent);

    try {
        const result = await publishProject(projectName, projectDescription, projectTags);
        console.log(result);
        alert('Projeto Publicado com sucesso!');
    } catch (error) {
        console.error(error);
        alert('Erro ao publicar projeto.');
    }
});

const discardButton = document.querySelector('.discard-button');

discardButton.addEventListener('click', (event) => {
    event.preventDefault();

    const form = document.querySelector('form');
    form.reset();

    mainImage.src = './img/imagem1.png';
    imageName.textContent = 'project.image.png'

    tagsList.innerHTML = '';
});
