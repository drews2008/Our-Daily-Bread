// Admin dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
    setupEventListeners();
});

function setupEventListeners() {
    const resetStatsBtn = document.getElementById('resetStats');
    const exportStatsBtn = document.getElementById('exportStats');

    if (resetStatsBtn) {
        resetStatsBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset all statistics? This cannot be undone.')) {
                analytics.resetStats();
                loadDashboard();
                showNotification('All statistics have been reset.', 'success');
            }
        });
    }

    if (exportStatsBtn) {
        exportStatsBtn.addEventListener('click', exportStatistics);
    }
}

function loadDashboard() {
    updateSummaryStats();
    renderStatsTable();
    renderChart();
}

function updateSummaryStats() {
    const totalViews = analytics.getTotalViews();
    const totalDevotions = devotions.length;
    const avgViews = analytics.getAverageViews();

    document.getElementById('totalViews').textContent = totalViews;
    document.getElementById('totalDevotions').textContent = totalDevotions;
    document.getElementById('avgViews').textContent = avgViews;
}

function renderStatsTable() {
    const tbody = document.getElementById('statsBody');
    tbody.innerHTML = '';

    const stats = analytics.getAllStats();

    // Sort devotions by view count (descending)
    const sortedDevotions = devotions.slice().sort((a, b) => {
        const statsA = stats[a.id] || { views: 0, lastViewed: null };
        const statsB = stats[b.id] || { views: 0, lastViewed: null };
        return statsB.views - statsA.views;
    });

    sortedDevotions.forEach(devotion => {
        const devotionStats = stats[devotion.id] || { views: 0, lastViewed: null };
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <strong>${escapeHtml(devotion.title)}</strong>
            </td>
            <td>${escapeHtml(devotion.author)}</td>
            <td>
                <span class="view-count">${devotionStats.views}</span>
            </td>
            <td>
                <span class="last-viewed">${analytics.formatLastViewed(devotionStats.lastViewed)}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn action-btn-view" onclick="viewDevotionFromAdmin(${devotion.id})">View</button>
                    <button class="action-btn action-btn-reset" onclick="resetDevotionStats(${devotion.id})">Reset</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderChart() {
    const container = document.getElementById('chartContainer');
    container.innerHTML = '';

    const stats = analytics.getAllStats();
    
    // Sort devotions by view count for chart
    const sortedDevotions = devotions.slice().sort((a, b) => {
        const statsA = stats[a.id] || { views: 0 };
        const statsB = stats[b.id] || { views: 0 };
        return statsB.views - statsA.views;
    });

    if (sortedDevotions.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">No data to display</p>';
        return;
    }

    // Find max views for scaling
    const maxViews = Math.max(
        ...sortedDevotions.map(d => (stats[d.id] || { views: 0 }).views),
        1
    );

    sortedDevotions.forEach(devotion => {
        const devotionStats = stats[devotion.id] || { views: 0 };
        const percentage = (devotionStats.views / maxViews) * 100;

        const barDiv = document.createElement('div');
        barDiv.className = 'chart-bar';
        barDiv.title = `${devotion.title}: ${devotionStats.views} views`;

        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = Math.max(percentage, 5) + '%';

        const value = document.createElement('div');
        value.className = 'bar-value';
        value.textContent = devotionStats.views;

        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = truncateText(devotion.title, 15);

        barDiv.appendChild(bar);
        barDiv.appendChild(value);
        barDiv.appendChild(label);
        container.appendChild(barDiv);
    });
}

function truncateText(text, length) {
    return text.length > length ? text.substring(0, length) + '...' : text;
}

function resetDevotionStats(devotionId) {
    const devotion = devotions.find(d => d.id === devotionId);
    if (!devotion) return;

    if (confirm(`Reset statistics for "${devotion.title}"?`)) {
        analytics.resetStats(devotionId);
        loadDashboard();
        showNotification(`Statistics for "${devotion.title}" have been reset.`, 'success');
    }
}

function viewDevotionFromAdmin(devotionId) {
    const devotion = devotions.find(d => d.id === devotionId);
    if (!devotion) return;

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

function exportStatistics() {
    const stats = analytics.getAllStats();
    const exportData = {
        exportDate: new Date().toISOString(),
        totalViews: analytics.getTotalViews(),
        averageViews: analytics.getAverageViews(),
        devotions: devotions.map(devotion => ({
            id: devotion.id,
            title: devotion.title,
            author: devotion.author,
            date: devotion.date,
            views: stats[devotion.id].views,
            lastViewed: stats[devotion.id].lastViewed
        }))
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `devotion-stats-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showNotification('Statistics exported successfully!', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    if (type === 'success') {
        notification.style.backgroundColor = 'var(--success-color)';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = 'var(--danger-color)';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = 'var(--primary-color)';
        notification.style.color = 'white';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animations to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Close modal when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDevotionModal();
    }
});