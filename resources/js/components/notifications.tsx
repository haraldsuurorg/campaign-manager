export function updateNotifications(type:string, text:string) {
    const notifications = document.getElementById('notification-messages');

    if (!notifications) return;

    if (type === 'update') {
        notifications.innerHTML = `<p class='text-sm text-[#23C552]'>${text}</p>`;
    } else if (type === 'error') {
        notifications.innerHTML = `<p class='text-sm text-[#F84F31]'>${text}</p>`;
    }

    setTimeout(() => {
        if (notifications) {
            notifications.innerHTML = '';
        }
    }, 3000);
}