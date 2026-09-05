// Main application for devotions page
document.addEventListener('DOMContentLoaded', function() {
    renderDevotions();
});

function renderDevotions() {
    const grid = document.getElementById('devotionsGrid');
    grid.innerHTML = '';

    devotions.forEach(devotion => {
        const stats = analytics.getStats(devotion.id);
        const card = document.createElement('div');
        card.className = 'devotion-card';
        card.innerHTML = `
            <div class="devotion-card-header">
                <h2 class="devotion-card-title">${escapeHtml(devotion.title)}</h2>
                <p class="devotion-card-author">by ${escapeHtml(devotion.author)}</p>
            </div>
            <div class="devotion-card-content">
                <p class="devotion-card-date">${formatDate(devotion.date)}</p>
                <p class="devotion-card-preview">${escapeHtml(devotion.preview)}</p>
                <button class="read-more-btn" onclick="openDevotionModal(${devotion.id})">Read Full Devotion</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function openDevotionModal(devotionId) {
    const devotion = devotions.find(d => d.id === devotionId);
    if (!devotion) return;

    // Record the view
    analytics.recordView(devotionId);

    // Create and display modal
    let modal = document.getElementById('devotionModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'devotionModal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeDevotionModal()">&times;</button>
            <div class="devotion-card-header" style="margin: -2rem -2rem 1rem -2rem; padding: 2rem;">
                <h1 class="devotion-card-title">${escapeHtml(devotion.title)}</h1>
                <p class="devotion-card-author">by ${escapeHtml(devotion.author)}</p>
            </div>
            <p class="devotion-card-date">${formatDate(devotion.date)}</p>
            <div class="devotion-content">
                ${escapeHtml(devotion.content).split('\n\n').map(para => `<p>${para}</p>`).join('')}
            </div>
        </div>
    `;
    modal.classList.add('active');

    // Close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeDevotionModal();
        }
    });
}

function closeDevotionModal() {
    const modal = document.getElementById('devotionModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Close modal when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDevotionModal();
    }
});