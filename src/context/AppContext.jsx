import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

// Mock Data
const MOCK_USERS = [
  { id: 'u1', phone: '1111111111', role: 'student', name: 'John Doe', room: 'A-102' },
  { id: 'u2', phone: '2222222222', role: 'warden', name: 'Mr. Sharma', wing: 'A' },
  { id: 'u3', phone: '3333333333', role: 'staff', name: 'Raj Kumar', type: 'electrician' },
];

const INITIAL_COMPLAINTS = [
  { 
    id: 'c1', 
    studentId: 'u1', 
    category: 'Electrical', 
    description: 'Fan is making weird noises', 
    status: 'pending', 
    urgency: 'low',
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
    assignedTo: null,
    eta: null,
    feedback: null
  },
  { 
    id: 'c2', 
    studentId: 'u1', 
    category: 'Plumbing', 
    description: 'Tap is leaking continuously', 
    status: 'assigned', 
    urgency: 'high',
    submittedAt: new Date(Date.now() - 3600000).toISOString(),
    assignedTo: 'u3',
    eta: 'Today, 4:00 PM',
    feedback: null
  },
];

const MESS_MENU = {
  breakfast: 'Poha, Jalebi, Tea/Coffee',
  lunch: 'Dal Makhani, Roti, Rice, Salad',
  dinner: 'Paneer Butter Masala, Naan, Gulab Jamun'
};

const INITIAL_NOTICES = [
  { id: 'n1', title: 'Water cut tomorrow', date: '2026-04-10', content: 'There will be no water from 10 AM to 2 PM.' },
  { id: 'n2', title: 'Fee submission deadline', date: '2026-04-15', content: 'Last date to submit hostel fees is 15th April.' }
];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [notifications, setNotifications] = useState([]);
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Load from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('hostel_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedComplaints = localStorage.getItem('hostel_complaints');
    if (savedComplaints) setComplaints(JSON.parse(savedComplaints));

    const savedTheme = localStorage.getItem('hostel_theme_dark');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save to local storage when state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('hostel_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hostel_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('hostel_complaints', JSON.stringify(complaints));
  }, [complaints]);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const nextTheme = !prev;
      if (nextTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('hostel_theme_dark', nextTheme.toString());
      return nextTheme;
    });
  };

  // Actions
  const formatName = (emailPrefix) => {
    const nameStr = emailPrefix.replace(/[0-9]/g, '');
    const parts = nameStr.split('.');
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(' ');
  };

  const login = (email) => {
    let role;
    if (email.endsWith('@vitstudent.ac.in')) {
      role = 'student';
    } else if (email.endsWith('@vitwarden.ac.in')) {
      role = 'warden';
    } else if (email.endsWith('@vitstaff.ac.in')) {
      role = 'staff';
    } else {
      return false;
    }

    const prefix = email.split('@')[0];
    const name = formatName(prefix);

    setUser({
      id: `u-${Date.now()}`,
      email: email,
      phone: '9999999999',
      role: role,
      name: name,
      room: role === 'student' ? 'A-102' : undefined,
      wing: role === 'warden' ? 'A' : undefined
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addComplaint = (complaint) => {
    const newComplaint = {
      ...complaint,
      id: `c${Date.now()}`,
      studentId: user.id,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      assignedTo: null,
      eta: null,
      feedback: null
    };
    setComplaints([newComplaint, ...complaints]);
    
    // Mock notification
    addNotification(`New complaint filed: ${complaint.category}`);
  };

  const updateComplaintStatus = (id, status, assignedTo = null, eta = null) => {
    setComplaints(complaints.map(c => {
      if (c.id === id) {
         return { ...c, status, assignedTo: assignedTo || c.assignedTo, eta: eta || c.eta };
      }
      return c;
    }));
  };

  const submitFeedback = (id, rating, comment) => {
     setComplaints(complaints.map(c => 
       c.id === id ? { ...c, feedback: { rating, comment } } : c
     ));
  };

  const addNotification = (message) => {
    const newNotification = { id: `notif-${Date.now()}`, message, read: false, time: new Date().toISOString() };
    setNotifications([newNotification, ...notifications]);
  };

  const addNotice = (title, content) => {
    const newNotice = { id: `n${Date.now()}`, title, date: new Date().toISOString(), content };
    setNotices([newNotice, ...notices]);
    addNotification(`Important announcement from Warden: ${title}`);
  };

  const markNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const value = {
    user,
    login,
    logout,
    complaints,
    addComplaint,
    updateComplaintStatus,
    submitFeedback,
    messMenu: MESS_MENU,
    notices: notices,
    addNotice,
    notifications,
    markNotificationsRead,
    isDarkMode,
    toggleTheme
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
