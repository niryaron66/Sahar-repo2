const isTestEnvironment = window.location.pathname.startsWith("/test");
export const API_BASE_URL = isTestEnvironment ? '/test/api' : '/api';

function setToken(token) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}

function getToken() {
  return localStorage.getItem('token');
}

function dispatchTokenUpdate(token) {
  const event = new CustomEvent('tokenUpdated', { detail: { token } });
  window.dispatchEvent(event);
}

export async function fetchLogin(accountNumber, userName, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ account_id: accountNumber, username: userName, password: password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('הפרטים שסיפקת אינם נכונים.');
  }
  const resData = await response.json();
  setToken(resData.token);
  dispatchTokenUpdate(resData.token); 
}

export async function fetchConversationsHistory(navigate, setOpenConversationsHistory, handleLogout, timeValue) {
  const token = getToken();
  if (!token) {
    window.dispatchEvent(new Event('triggerTokenRefresh')); 
    return;
  }
  const url = `${API_BASE_URL}/get_history_calls?minutes_to_fetch=${timeValue}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`, 
    },
  });
  if (!response.ok) {
    if (response.status === 403) {
       window.dispatchEvent(new Event('triggerTokenRefresh')); 
       return;
    }
    return;
  }
  const resData = await response.json();
  setOpenConversationsHistory(Object.values(resData.history));
}
