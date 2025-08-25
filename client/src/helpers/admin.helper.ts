export const getRoleColors = (role: string): string => {
    switch (role) {
      case 'admin':
        return 'bg-blue-900/30 text-blue-400';
      case 'assistant':
        return 'bg-green-900/30 text-green-400';
      case 'operator':
        return 'bg-yellow-900/30 text-yellow-400';
      default:
        return 'bg-red-900/30 text-red-400';
    }
  };
export const getActivityColor = (type: string): string => {
    switch (type) {
      case 'delete':
        return 'bg-red-400';
      case 'create':
        return 'bg-green-400';
      case 'update':
        return 'bg-blue-400';
      default:
        return 'bg-gray-400';
    }
  };

export const getBusTypeColor = (type: string): string => {
    switch (type) {
      case 'express':
        return 'bg-yellow-400/10 text-yellow-400';
      case 'normal':
        return 'bg-blue-400/10 text-blue-400';
      case 'vip':
        return 'bg-purple-400/10 text-purple-400';
      default:
        return 'bg-gray-400';
    }
  };

export const getBusStatusColor = (type: string): string => {
    switch (type) {
      case 'ontime':
        return 'bg-yellow-400/10 text-yellow-400';
      case 'delayed':
        return 'bg-blue-400/10 text-blue-400';
      case 'cancelled':
        return 'bg-purple-400/10 text-purple-400';
      default:
        return 'bg-gray-400';
    }
  };
export function timeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) {
    return `recently`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}

export function capitalizeFirst(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDateTime(lastActive: string): string {
  const date = new Date(lastActive);
  
  // Get day name
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[date.getUTCDay()];
  
  // Format time in AM/PM
  let hours = date.getUTCHours() + 3;
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12
  const time = `${hours}:${minutes} ${ampm}`;
  
  // Format date as DD/MM/YYYY
  const dayNum = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  const formattedDate = `${dayNum}/${month}/${year}`;

  
  return day + ", " + time + " - " + formattedDate;
}
