// Sample devotion data
const devotions = [
    {
        id: 1,
        title: "The Power of Faith",
        author: "Rev. John Smith",
        date: "2026-09-05",
        content: `Faith is the substance of things hoped for, the evidence of things not seen. In our daily lives, we often face situations that challenge our belief in God's plan. When we encounter obstacles, setbacks, or uncertainty, it's our faith that keeps us grounded.

Throughout the Bible, we see countless examples of individuals who demonstrated extraordinary faith. Abraham left his home with no certainty of where he was going. Moses trusted God to lead the Israelites through the wilderness. And Jesus himself showed us the ultimate example of faith in surrendering to God's will.

Today, I encourage you to reflect on the areas of your life where your faith is being tested. Ask God to strengthen your belief and to guide you through these trials. Remember that faith is not just believing in God, but trusting in His goodness and His plan for your life, even when we cannot see the full picture.

May your faith be a light that guides you through the darkness of doubt and uncertainty.`,
        preview: "Faith is the substance of things hoped for, the evidence of things not seen. In our daily lives, we often face situations that challenge our belief in God's plan..."
    },
    {
        id: 2,
        title: "Grace Sufficient for Today",
        author: "Pastor Mary Johnson",
        date: "2026-09-04",
        content: `My grace is sufficient for you, for my power is made perfect in weakness. These words from 2 Corinthians 12:9 remind us that we do not need to face our struggles alone.

In a world that constantly demands we be strong, independent, and capable, grace offers us something radically different. Grace is God's unmerited favor, His gift to us that we did not earn and cannot deserve. It is offered freely to all who believe.

When we acknowledge our weakness and our need for God's grace, we open ourselves to experiencing His power in our lives. This is not a sign of failure or inadequacy; rather, it is the pathway to true strength.

Consider the areas of your life where you feel weak or overwhelmed. Instead of trying to overcome these challenges through your own strength, invite God's grace into those spaces. Trust that His power works through our limitations, transforming them into opportunities for His glory.

Today, receive God's grace with gratitude and humility.`,
        preview: "My grace is sufficient for you, for my power is made perfect in weakness. These words from 2 Corinthians 12:9 remind us that we do not need to face our struggles alone..."
    },
    {
        id: 3,
        title: "Love Your Neighbor",
        author: "Rev. David Lee",
        date: "2026-09-03",
        content: `Jesus taught us that the greatest commandment after loving God is to love our neighbor as ourselves. This simple yet profound teaching has the power to transform our communities and our world.

But what does it mean to love our neighbor? It means seeing Christ in every person we encounter. It means showing compassion, kindness, and respect to those around us, regardless of their background, beliefs, or circumstances.

In today's society, we often encounter people who are different from us. They may speak a different language, practice a different faith, or come from a different culture. These differences should not be barriers to our love and compassion. Instead, they are opportunities to practice Christ's commandment and to learn from one another.

As you go through your day, ask yourself: How can I show love to my neighbor? What small act of kindness can I perform? Who in my life might need my compassion and support?

Remember, loving your neighbor is not just about grand gestures. It's about the small, consistent acts of kindness that demonstrate God's love in action.`,
        preview: "Jesus taught us that the greatest commandment after loving God is to love our neighbor as ourselves. This simple yet profound teaching has the power to transform..."
    },
    {
        id: 4,
        title: "Finding Peace in Chaos",
        author: "Sister Catherine Williams",
        date: "2026-09-02",
        content: `Peace I leave with you; my peace I give you. This is Jesus's promise to us, but how do we find peace in a world that seems increasingly chaotic and uncertain?

The peace that Jesus offers is not the absence of challenges or difficulties. Rather, it's an internal sense of calm and trust that comes from knowing God is in control. This peace surpasses human understanding because it exists even in the midst of storms.

In our modern world, we are constantly bombarded with news, social media updates, and information from all directions. This can leave us feeling anxious, overwhelmed, and disconnected from the peace that God offers. To find peace, we must intentionally create space for silence, prayer, and reflection.

Take time today to quiet your mind and your heart. Sit with God in silence. Let go of your worries and concerns, and trust that God is caring for them. When you return to your daily activities, you may find that this simple practice has transformed your perspective.

The peace of Christ is available to you right now, in this very moment.`,
        preview: "Peace I leave with you; my peace I give you. This is Jesus's promise to us, but how do we find peace in a world that seems increasingly chaotic and uncertain?..."
    },
    {
        id: 5,
        title: "Hope for Tomorrow",
        author: "Rev. Michael Brown",
        date: "2026-09-01",
        content: `Why are you downcast, O my soul? Why so disturbed within me? Put your hope in God. These words from Psalm 42 speak to the depths of human despair and offer us a pathway to hope.

Hope is not merely optimism or positive thinking. Christian hope is grounded in the reality of God's promises and His faithfulness throughout history. Even when our circumstances seem impossible, our hope remains anchored in God's character and His plan for redemption.

Throughout the Bible, we see stories of people who faced seemingly insurmountable challenges yet maintained their hope in God. Joseph in prison, Daniel in the lion's den, the disciples after Jesus's crucifixion – all faced dark moments, yet their hope in God sustained them.

Whatever challenges you are facing today – whether they are personal struggles, family difficulties, or broader societal concerns – remember that hope is available to you. This hope is not based on the changing circumstances of this world, but on the unchanging nature of our God.

Let your hope today be rooted not in what you can see or understand, but in the God who is faithful, loving, and true.`,
        preview: "Why are you downcast, O my soul? Why so disturbed within me? Put your hope in God. These words from Psalm 42 speak to the depths of human despair..."
    },
    {
        id: 6,
        title: "Living with Gratitude",
        author: "Pastor Elizabeth Adams",
        date: "2026-08-31",
        content: `Rejoice always, pray continually, give thanks in all circumstances. This is God's will for you in Christ Jesus. The apostle Paul's words challenge us to maintain an attitude of gratitude even when life is difficult.

Gratitude is not a feeling that naturally arises when things are going wrong. Rather, it's a choice we make to acknowledge and appreciate God's blessings, even in the midst of trials. When we practice gratitude, we shift our focus from what we lack to what we have been given.

Scientific research has shown that people who practice gratitude experience greater joy, better mental health, and stronger relationships. But beyond these psychological benefits, gratitude is a spiritual practice that deepens our connection to God and transforms our perspective on life.

Today, I encourage you to make a list of things you are grateful for. These can be big blessings – health, family, faith – or small ones – a warm cup of coffee, a kind word from a friend, a beautiful sunset. As you reflect on these blessings, take time to thank God specifically for each one.

This simple practice of gratitude can transform your entire day and your outlook on life.`,
        preview: "Rejoice always, pray continually, give thanks in all circumstances. This is God's will for you in Christ Jesus. The apostle Paul's words challenge us..."
    }
];

// Analytics and tracking system
class DevotionAnalytics {
    constructor() {
        this.storageKey = 'devotion-views';
        this.initializeAnalytics();
    }

    initializeAnalytics() {
        if (!localStorage.getItem(this.storageKey)) {
            const initialStats = {};
            devotions.forEach(devotion => {
                initialStats[devotion.id] = {
                    views: 0,
                    lastViewed: null
                };
            });
            localStorage.setItem(this.storageKey, JSON.stringify(initialStats));
        }
    }

    recordView(devotionId) {
        const stats = JSON.parse(localStorage.getItem(this.storageKey));
        if (stats[devotionId]) {
            stats[devotionId].views += 1;
            stats[devotionId].lastViewed = new Date().toISOString();
            localStorage.setItem(this.storageKey, JSON.stringify(stats));
        }
    }

    getStats(devotionId) {
        const stats = JSON.parse(localStorage.getItem(this.storageKey));
        return stats[devotionId] || { views: 0, lastViewed: null };
    }

    getAllStats() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || {};
    }

    resetStats(devotionId = null) {
        const stats = JSON.parse(localStorage.getItem(this.storageKey));
        if (devotionId) {
            stats[devotionId] = { views: 0, lastViewed: null };
        } else {
            Object.keys(stats).forEach(key => {
                stats[key] = { views: 0, lastViewed: null };
            });
        }
        localStorage.setItem(this.storageKey, JSON.stringify(stats));
    }

    getTotalViews() {
        const stats = JSON.parse(localStorage.getItem(this.storageKey));
        return Object.values(stats).reduce((sum, stat) => sum + stat.views, 0);
    }

    getAverageViews() {
        const stats = JSON.parse(localStorage.getItem(this.storageKey));
        const totalViews = this.getTotalViews();
        const count = Object.keys(stats).length;
        return count > 0 ? Math.round(totalViews / count) : 0;
    }

    getTopDevotions(limit = 5) {
        const stats = JSON.parse(localStorage.getItem(this.storageKey));
        return Object.entries(stats)
            .sort((a, b) => b[1].views - a[1].views)
            .slice(0, limit)
            .map(([id, stat]) => ({
                id: parseInt(id),
                ...stat
            }));
    }

    formatLastViewed(dateString) {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        
        return date.toLocaleDateString();
    }
}

// Create global analytics instance
const analytics = new DevotionAnalytics();