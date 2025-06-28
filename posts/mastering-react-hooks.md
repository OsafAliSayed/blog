---
title: "Mastering React Hooks"
date: "2025-06-24"
---

# Mastering React Hooks

React Hooks have revolutionized the way we write React components. They allow us to use state and other React features in functional components, making our code more concise and easier to understand.

![React Logo](/next.svg)

## What are React Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 and have since become the standard way of writing React components.

### Basic Hooks

#### useState Hook

The `useState` hook lets you add state to functional components:

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

![Window representing state management](/window.svg)

#### useEffect Hook

The `useEffect` hook lets you perform side effects in function components:

```javascript
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setUser(userData);
    }
    
    fetchUser();
  }, [userId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

## Advanced Hooks

### useContext Hook

The `useContext` hook provides a way to pass data through the component tree without prop drilling:

```javascript
import { createContext, useContext } from 'react';

const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Button</button>;
}
```

![File representing data flow](/file.svg)

### useReducer Hook

For complex state logic, `useReducer` is a great alternative to `useState`:

```javascript
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

## Custom Hooks

One of the most powerful features of hooks is the ability to create your own:

```javascript
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function Settings() {
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name"
    />
  );
}
```

![Globe representing global state](/globe.svg)

## Best Practices

### 1. Always Call Hooks at the Top Level

Never call hooks inside loops, conditions, or nested functions:

```javascript
// ❌ Don't do this
function MyComponent({ condition }) {
  if (condition) {
    const [state, setState] = useState(); // This breaks the rules
  }
}

// ✅ Do this instead
function MyComponent({ condition }) {
  const [state, setState] = useState();
  
  if (condition) {
    // Use the state here
  }
}
```

### 2. Use the Dependency Array Correctly

Always include all dependencies in the useEffect dependency array:

```javascript
// ❌ Missing dependency
function MyComponent({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []); // Missing userId dependency
}

// ✅ Correct dependencies
function MyComponent({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Include userId
}
```

### 3. Extract Custom Hooks for Reusable Logic

If you find yourself repeating the same stateful logic, extract it into a custom hook:

```javascript
// Custom hook for API calls
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
```

![Vercel representing deployment](/vercel.svg)

## Conclusion

React Hooks have made functional components more powerful and have simplified React development significantly. They provide a more direct API to the React concepts you already know and enable better code reuse through custom hooks.

Key takeaways:
- Use `useState` for simple state management
- Use `useEffect` for side effects and lifecycle methods
- Use `useContext` to avoid prop drilling
- Use `useReducer` for complex state logic
- Create custom hooks for reusable stateful logic
- Always follow the rules of hooks

Start incorporating these patterns into your React applications, and you'll find your code becoming more maintainable and easier to understand!
