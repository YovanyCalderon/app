import React, { useState, useEffect, useMemo, useContext, createContext } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import { 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Settings, 
  X, 
  Home,
  ExternalLink,
  BookOpen,
  Keyboard,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';

// Theme Context
const ThemeContext = createContext();

// Theme Provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('devdocs-theme');
    return saved || 'auto';
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      if (theme === 'auto') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(systemPrefersDark);
      } else {
        setIsDark(theme === 'dark');
      }
    };

    updateTheme();
    
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('devdocs-theme', theme);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, isDark]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Enhanced Mock documentation data with detailed content
const mockDocumentations = {
  // ENABLED DOCUMENTATIONS
  css: {
    name: 'CSS',
    icon: '🎨',
    version: '3',
    enabled: true,
    color: 'text-blue-600',
    sections: [
      {
        name: 'Properties',
        items: [
          { name: 'background', count: 8, id: 'css-background' },
          { name: 'border', count: 12, id: 'css-border' },
          { name: 'color', count: 4, id: 'css-color' },
          { name: 'display', count: 6, id: 'css-display' },
          { name: 'flexbox', count: 15, id: 'css-flexbox' },
          { name: 'grid', count: 20, id: 'css-grid' },
          { name: 'position', count: 5, id: 'css-position' },
          { name: 'text', count: 10, id: 'css-text' },
          { name: 'animation', count: 12, id: 'css-animation' },
          { name: 'transform', count: 8, id: 'css-transform' }
        ]
      },
      {
        name: 'Selectors',
        items: [
          { name: 'class', count: 1, id: 'css-class-selector' },
          { name: 'id', count: 1, id: 'css-id-selector' },
          { name: 'pseudo-classes', count: 25, id: 'css-pseudo-classes' },
          { name: 'pseudo-elements', count: 12, id: 'css-pseudo-elements' }
        ]
      }
    ],
    content: {
      title: 'CSS reference',
      description: 'CSS (Cascading Style Sheets) is a language used to describe the presentation of a document written in HTML or XML. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.',
      sections: [
        {
          title: 'Properties',
          content: 'CSS properties define how HTML elements should be styled. Properties can control layout, colors, fonts, spacing, and more.',
          links: [
            { name: 'background-color', url: '#' },
            { name: 'border-radius', url: '#' },
            { name: 'display', url: '#' },
            { name: 'flex-direction', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'css-background': {
        title: 'CSS Background Properties',
        description: 'CSS background properties are used to define the background effects for elements.',
        syntax: 'background: color image repeat attachment position;',
        properties: [
          { name: 'background-color', description: 'Sets the background color of an element', example: 'background-color: #ff0000;' },
          { name: 'background-image', description: 'Sets one or more background images for an element', example: 'background-image: url("bg.jpg");' },
          { name: 'background-repeat', description: 'Sets how background images are repeated', example: 'background-repeat: no-repeat;' },
          { name: 'background-position', description: 'Sets the initial position for background images', example: 'background-position: center;' },
          { name: 'background-size', description: 'Sets the size of background images', example: 'background-size: cover;' }
        ]
      },
      'css-flexbox': {
        title: 'CSS Flexbox',
        description: 'The Flexible Box Layout (flexbox) is a one-dimensional layout method for laying out items in rows or columns.',
        syntax: 'display: flex;',
        properties: [
          { name: 'display', description: 'Defines a flex container', example: 'display: flex;' },
          { name: 'flex-direction', description: 'Defines the direction of the main axis', example: 'flex-direction: column;' },
          { name: 'justify-content', description: 'Aligns items along the main axis', example: 'justify-content: center;' },
          { name: 'align-items', description: 'Aligns items along the cross axis', example: 'align-items: stretch;' },
          { name: 'flex-wrap', description: 'Controls whether items wrap to new lines', example: 'flex-wrap: wrap;' }
        ]
      }
    }
  },
  html: {
    name: 'HTML',
    icon: '📄',
    version: '5',
    enabled: true,
    color: 'text-orange-600',
    sections: [
      {
        name: 'Elements',
        items: [
          { name: 'Document', count: 12, id: 'html-document' },
          { name: 'Forms', count: 18, id: 'html-forms' },
          { name: 'Media', count: 8, id: 'html-media' },
          { name: 'Semantic', count: 15, id: 'html-semantic' },
          { name: 'Tables', count: 10, id: 'html-tables' },
          { name: 'Text Content', count: 20, id: 'html-text' },
          { name: 'Interactive', count: 8, id: 'html-interactive' }
        ]
      },
      {
        name: 'Attributes',
        items: [
          { name: 'Global Attributes', count: 25, id: 'html-global-attrs' },
          { name: 'Event Attributes', count: 30, id: 'html-event-attrs' }
        ]
      }
    ],
    content: {
      title: 'HTML reference',
      description: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications.',
      sections: [
        {
          title: 'Elements',
          content: 'HTML elements are the building blocks of HTML pages.',
          links: [
            { name: 'div', url: '#' },
            { name: 'span', url: '#' },
            { name: 'form', url: '#' },
            { name: 'input', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'html-forms': {
        title: 'HTML Form Elements',
        description: 'HTML forms are used to collect user input. Form elements are different types of input elements, checkboxes, radio buttons, submit buttons, and more.',
        elements: [
          { name: 'form', description: 'Defines an HTML form for user input', example: '<form action="/submit" method="post"></form>' },
          { name: 'input', description: 'Defines an input control', example: '<input type="text" name="username">' },
          { name: 'textarea', description: 'Defines a multiline input control', example: '<textarea rows="4" cols="50"></textarea>' },
          { name: 'select', description: 'Defines a drop-down list', example: '<select name="cars"><option value="volvo">Volvo</option></select>' },
          { name: 'button', description: 'Defines a clickable button', example: '<button type="submit">Submit</button>' }
        ]
      }
    }
  },
  javascript: {
    name: 'JavaScript',
    icon: '⚡',
    version: 'ES2024',
    enabled: true,
    color: 'text-yellow-600',
    sections: [
      {
        name: 'Built-ins',
        items: [
          { name: 'Array', count: 48, id: 'js-array' },
          { name: 'Object', count: 35, id: 'js-object' },
          { name: 'String', count: 28, id: 'js-string' },
          { name: 'Number', count: 22, id: 'js-number' },
          { name: 'Date', count: 15, id: 'js-date' },
          { name: 'Math', count: 18, id: 'js-math' },
          { name: 'RegExp', count: 12, id: 'js-regexp' },
          { name: 'Promise', count: 8, id: 'js-promise' },
          { name: 'Map', count: 10, id: 'js-map' },
          { name: 'Set', count: 8, id: 'js-set' }
        ]
      },
      {
        name: 'Functions',
        items: [
          { name: 'eval()', count: 1, id: 'js-eval' },
          { name: 'parseInt()', count: 1, id: 'js-parseint' },
          { name: 'parseFloat()', count: 1, id: 'js-parsefloat' },
          { name: 'isNaN()', count: 1, id: 'js-isnan' },
          { name: 'setTimeout()', count: 1, id: 'js-settimeout' }
        ]
      },
      {
        name: 'Operators',
        items: [
          { name: 'Arithmetic', count: 7, id: 'js-arithmetic' },
          { name: 'Comparison', count: 8, id: 'js-comparison' },
          { name: 'Logical', count: 3, id: 'js-logical' },
          { name: 'Assignment', count: 12, id: 'js-assignment' }
        ]
      }
    ],
    content: {
      title: 'JavaScript reference',
      description: 'The JavaScript reference serves as a repository of facts about the JavaScript language. The entire language is described here in detail.',
      sections: [
        {
          title: 'Built-ins',
          content: 'JavaScript standard built-in objects, along with their methods and properties.',
          links: [
            { name: 'Array', url: '#' },
            { name: 'Object', url: '#' },
            { name: 'String', url: '#' },
            { name: 'Number', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'js-array': {
        title: 'Array',
        description: 'The Array object, as with arrays in other programming languages, enables storing a collection of multiple items under a single variable name.',
        syntax: 'new Array(element0, element1, ..., elementN)',
        methods: [
          { name: 'push()', description: 'Adds one or more elements to the end of an array', example: 'arr.push(1, 2, 3)', returns: 'The new length of the array' },
          { name: 'pop()', description: 'Removes the last element from an array', example: 'arr.pop()', returns: 'The removed element' },
          { name: 'shift()', description: 'Removes the first element from an array', example: 'arr.shift()', returns: 'The removed element' },
          { name: 'unshift()', description: 'Adds one or more elements to the beginning of an array', example: 'arr.unshift(0)', returns: 'The new length' },
          { name: 'slice()', description: 'Returns a shallow copy of a portion of an array', example: 'arr.slice(1, 3)', returns: 'A new array' },
          { name: 'splice()', description: 'Changes the array by removing/replacing existing elements', example: 'arr.splice(1, 2, "a")', returns: 'Array of removed elements' },
          { name: 'map()', description: 'Creates a new array with the results of calling a function for every array element', example: 'arr.map(x => x * 2)', returns: 'A new array' },
          { name: 'filter()', description: 'Creates a new array with elements that pass a test', example: 'arr.filter(x => x > 5)', returns: 'A new array' },
          { name: 'reduce()', description: 'Reduces the array to a single value', example: 'arr.reduce((a, b) => a + b)', returns: 'The accumulated result' },
          { name: 'forEach()', description: 'Calls a function for each array element', example: 'arr.forEach(console.log)', returns: 'undefined' },
          { name: 'find()', description: 'Returns the first element that satisfies the testing function', example: 'arr.find(x => x > 10)', returns: 'The found element or undefined' },
          { name: 'indexOf()', description: 'Returns the first index at which a given element can be found', example: 'arr.indexOf("hello")', returns: 'Index number or -1' },
          { name: 'includes()', description: 'Determines whether an array includes a certain value', example: 'arr.includes("test")', returns: 'true or false' },
          { name: 'join()', description: 'Joins all elements of an array into a string', example: 'arr.join(", ")', returns: 'A string' },
          { name: 'reverse()', description: 'Reverses an array in place', example: 'arr.reverse()', returns: 'The reversed array' },
          { name: 'sort()', description: 'Sorts the elements of an array in place', example: 'arr.sort((a, b) => a - b)', returns: 'The sorted array' }
        ],
        properties: [
          { name: 'length', description: 'Sets or returns the number of elements in an array', example: 'arr.length' }
        ]
      },
      'js-string': {
        title: 'String',
        description: 'The String object is used to represent and manipulate a sequence of characters.',
        syntax: 'new String(value)',
        methods: [
          { name: 'charAt()', description: 'Returns the character at a specified index', example: 'str.charAt(0)', returns: 'A character' },
          { name: 'substring()', description: 'Extracts characters between two indices', example: 'str.substring(0, 5)', returns: 'A substring' },
          { name: 'slice()', description: 'Extracts a section of a string', example: 'str.slice(0, 5)', returns: 'A substring' },
          { name: 'toLowerCase()', description: 'Converts string to lowercase', example: 'str.toLowerCase()', returns: 'Lowercase string' },
          { name: 'toUpperCase()', description: 'Converts string to uppercase', example: 'str.toUpperCase()', returns: 'Uppercase string' },
          { name: 'trim()', description: 'Removes whitespace from both ends', example: 'str.trim()', returns: 'Trimmed string' },
          { name: 'split()', description: 'Splits string into an array', example: 'str.split(",")', returns: 'An array' },
          { name: 'replace()', description: 'Replaces text in a string', example: 'str.replace("old", "new")', returns: 'Modified string' },
          { name: 'indexOf()', description: 'Returns the index of the first occurrence', example: 'str.indexOf("text")', returns: 'Index or -1' },
          { name: 'includes()', description: 'Checks if string contains specified text', example: 'str.includes("test")', returns: 'true or false' }
        ],
        properties: [
          { name: 'length', description: 'Returns the length of a string', example: 'str.length' }
        ]
      },
      'js-object': {
        title: 'Object',
        description: 'The Object class represents one of JavaScript\'s data types. It is used to store various keyed collections and more complex entities.',
        syntax: 'new Object()',
        methods: [
          { name: 'Object.keys()', description: 'Returns an array of object\'s own property names', example: 'Object.keys(obj)', returns: 'Array of keys' },
          { name: 'Object.values()', description: 'Returns an array of object\'s own property values', example: 'Object.values(obj)', returns: 'Array of values' },
          { name: 'Object.entries()', description: 'Returns an array of object\'s own [key, value] pairs', example: 'Object.entries(obj)', returns: 'Array of [key, value] arrays' },
          { name: 'Object.assign()', description: 'Copies properties from source objects to target object', example: 'Object.assign(target, source)', returns: 'Modified target object' },
          { name: 'hasOwnProperty()', description: 'Returns whether object has the specified property', example: 'obj.hasOwnProperty("prop")', returns: 'true or false' }
        ]
      },
      'js-math': {
        title: 'Math',
        description: 'Math is a built-in object that has properties and methods for mathematical constants and functions.',
        methods: [
          { name: 'Math.abs()', description: 'Returns the absolute value of a number', example: 'Math.abs(-5)', returns: '5' },
          { name: 'Math.ceil()', description: 'Rounds a number up to the nearest integer', example: 'Math.ceil(4.3)', returns: '5' },
          { name: 'Math.floor()', description: 'Rounds a number down to the nearest integer', example: 'Math.floor(4.7)', returns: '4' },
          { name: 'Math.round()', description: 'Rounds a number to the nearest integer', example: 'Math.round(4.5)', returns: '5' },
          { name: 'Math.max()', description: 'Returns the largest of zero or more numbers', example: 'Math.max(1, 2, 3)', returns: '3' },
          { name: 'Math.min()', description: 'Returns the smallest of zero or more numbers', example: 'Math.min(1, 2, 3)', returns: '1' },
          { name: 'Math.random()', description: 'Returns a random number between 0 and 1', example: 'Math.random()', returns: 'Random decimal' },
          { name: 'Math.pow()', description: 'Returns base to the exponent power', example: 'Math.pow(2, 3)', returns: '8' },
          { name: 'Math.sqrt()', description: 'Returns the square root of a number', example: 'Math.sqrt(9)', returns: '3' }
        ],
        properties: [
          { name: 'Math.PI', description: 'The ratio of circumference to diameter', example: 'Math.PI' },
          { name: 'Math.E', description: 'Euler\'s number', example: 'Math.E' }
        ]
      }
    }
  },
  react: {
    name: 'React',
    icon: '⚛️',
    version: '18.3.1',
    enabled: true,
    color: 'text-cyan-600',
    sections: [
      {
        name: 'Hooks',
        items: [
          { name: 'useState', count: 1, id: 'react-usestate' },
          { name: 'useEffect', count: 1, id: 'react-useeffect' },
          { name: 'useContext', count: 1, id: 'react-usecontext' },
          { name: 'useReducer', count: 1, id: 'react-usereducer' },
          { name: 'useCallback', count: 1, id: 'react-usecallback' },
          { name: 'useMemo', count: 1, id: 'react-usememo' },
          { name: 'useRef', count: 1, id: 'react-useref' },
          { name: 'useImperativeHandle', count: 1, id: 'react-useimperativehandle' },
          { name: 'useLayoutEffect', count: 1, id: 'react-uselayouteffect' }
        ]
      },
      {
        name: 'Components',
        items: [
          { name: 'Component', count: 1, id: 'react-component' },
          { name: 'PureComponent', count: 1, id: 'react-purecomponent' },
          { name: 'Fragment', count: 1, id: 'react-fragment' },
          { name: 'Suspense', count: 1, id: 'react-suspense' },
          { name: 'ErrorBoundary', count: 1, id: 'react-errorboundary' }
        ]
      }
    ],
    content: {
      title: 'React reference',
      description: 'React is a JavaScript library for building user interfaces. It lets you create reusable components and manage application state efficiently.',
      sections: [
        {
          title: 'Hooks',
          content: 'Hooks let you use state and other React features without writing a class.',
          links: [
            { name: 'useState', url: '#' },
            { name: 'useEffect', url: '#' },
            { name: 'useContext', url: '#' },
            { name: 'useReducer', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'react-usestate': {
        title: 'useState',
        description: 'useState is a Hook that lets you add React state to function components.',
        syntax: 'const [state, setState] = useState(initialState)',
        examples: [
          {
            title: 'Basic Counter',
            code: `const [count, setCount] = useState(0);

return (
  <div>
    <p>You clicked {count} times</p>
    <button onClick={() => setCount(count + 1)}>
      Click me
    </button>
  </div>
);`
          },
          {
            title: 'Object State',
            code: `const [user, setUser] = useState({
  name: 'John',
  age: 30
});

const updateName = () => {
  setUser(prevUser => ({
    ...prevUser,
    name: 'Jane'
  }));
};`
          }
        ],
        parameters: [
          { name: 'initialState', description: 'The initial state value' }
        ],
        returns: 'An array with two elements: current state and state setter function'
      },
      'react-useeffect': {
        title: 'useEffect',
        description: 'useEffect lets you perform side effects in function components.',
        syntax: 'useEffect(setup, dependencies?)',
        examples: [
          {
            title: 'Basic Effect',
            code: `useEffect(() => {
  document.title = \`You clicked \${count} times\`;
});`
          },
          {
            title: 'Effect with Cleanup',
            code: `useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
  
  return () => clearInterval(timer);
}, []);`
          }
        ]
      }
    }
  },
  'node.js': {
    name: 'Node.js',
    icon: '🟢',
    version: '22.11.0',
    enabled: true,
    color: 'text-green-600',
    sections: [
      {
        name: 'Core Modules',
        items: [
          { name: 'fs', count: 45, id: 'node-fs' },
          { name: 'http', count: 32, id: 'node-http' },
          { name: 'path', count: 28, id: 'node-path' },
          { name: 'url', count: 18, id: 'node-url' },
          { name: 'crypto', count: 25, id: 'node-crypto' },
          { name: 'os', count: 22, id: 'node-os' },
          { name: 'stream', count: 38, id: 'node-stream' },
          { name: 'buffer', count: 30, id: 'node-buffer' },
          { name: 'events', count: 15, id: 'node-events' }
        ]
      }
    ],
    content: {
      title: 'Node.js reference',
      description: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine. It allows you to run JavaScript on the server side.',
      sections: [
        {
          title: 'Core Modules',
          content: 'Node.js provides a set of built-in modules that you can use without installing.',
          links: [
            { name: 'fs - File System', url: '#' },
            { name: 'http - HTTP', url: '#' },
            { name: 'path - Path', url: '#' },
            { name: 'crypto - Crypto', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'node-fs': {
        title: 'File System (fs)',
        description: 'The fs module provides an API for interacting with the file system.',
        examples: [
          {
            title: 'Reading a file',
            code: `const fs = require('fs');

// Synchronous
const data = fs.readFileSync('file.txt', 'utf8');

// Asynchronous
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});`
          }
        ],
        methods: [
          { name: 'readFile()', description: 'Asynchronously reads the entire contents of a file' },
          { name: 'writeFile()', description: 'Asynchronously writes data to a file' },
          { name: 'mkdir()', description: 'Creates a directory' },
          { name: 'readdir()', description: 'Reads the contents of a directory' }
        ]
      }
    }
  },
  python: {
    name: 'Python',
    icon: '🐍',
    version: '3.12',
    enabled: true,
    color: 'text-blue-500',
    sections: [
      {
        name: 'Built-in Functions',
        items: [
          { name: 'print', count: 1, id: 'python-print' },
          { name: 'len', count: 1, id: 'python-len' },
          { name: 'type', count: 1, id: 'python-type' },
          { name: 'str', count: 1, id: 'python-str' },
          { name: 'int', count: 1, id: 'python-int' },
          { name: 'float', count: 1, id: 'python-float' },
          { name: 'list', count: 1, id: 'python-list' },
          { name: 'dict', count: 1, id: 'python-dict' },
          { name: 'range', count: 1, id: 'python-range' },
          { name: 'enumerate', count: 1, id: 'python-enumerate' }
        ]
      },
      {
        name: 'Data Types',
        items: [
          { name: 'string', count: 25, id: 'python-string' },
          { name: 'list', count: 20, id: 'python-list-methods' },
          { name: 'dict', count: 15, id: 'python-dict-methods' },
          { name: 'set', count: 12, id: 'python-set' },
          { name: 'tuple', count: 8, id: 'python-tuple' }
        ]
      }
    ],
    content: {
      title: 'Python reference',
      description: 'Python is a programming language that lets you work quickly and integrate systems more effectively.',
      sections: [
        {
          title: 'Built-in Functions',
          content: 'Python has many built-in functions that are always available.',
          links: [
            { name: 'print()', url: '#' },
            { name: 'len()', url: '#' },
            { name: 'type()', url: '#' },
            { name: 'str()', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'python-list': {
        title: 'list',
        description: 'Lists are ordered collections of items that can be changed (mutable).',
        syntax: 'list([iterable])',
        methods: [
          { name: 'append()', description: 'Adds an element to the end of the list', example: 'my_list.append(item)' },
          { name: 'insert()', description: 'Inserts an element at a specific position', example: 'my_list.insert(0, item)' },
          { name: 'remove()', description: 'Removes the first occurrence of an element', example: 'my_list.remove(item)' },
          { name: 'pop()', description: 'Removes and returns an element at given index', example: 'my_list.pop(0)' },
          { name: 'index()', description: 'Returns the index of the first occurrence', example: 'my_list.index(item)' },
          { name: 'count()', description: 'Returns the number of occurrences', example: 'my_list.count(item)' },
          { name: 'sort()', description: 'Sorts the list in ascending order', example: 'my_list.sort()' },
          { name: 'reverse()', description: 'Reverses the elements of the list', example: 'my_list.reverse()' }
        ]
      }
    }
  },
  http: {
    name: 'HTTP',
    icon: '🌐',
    version: '2.0',
    enabled: true,
    color: 'text-blue-500',
    sections: [
      {
        name: 'Methods',
        items: [
          { name: 'GET', count: 1, id: 'http-get' },
          { name: 'POST', count: 1, id: 'http-post' },
          { name: 'PUT', count: 1, id: 'http-put' },
          { name: 'DELETE', count: 1, id: 'http-delete' },
          { name: 'PATCH', count: 1, id: 'http-patch' },
          { name: 'HEAD', count: 1, id: 'http-head' },
          { name: 'OPTIONS', count: 1, id: 'http-options' }
        ]
      },
      {
        name: 'Status Codes',
        items: [
          { name: '2xx Success', count: 8, id: 'http-2xx' },
          { name: '3xx Redirection', count: 8, id: 'http-3xx' },
          { name: '4xx Client Error', count: 15, id: 'http-4xx' },
          { name: '5xx Server Error', count: 10, id: 'http-5xx' }
        ]
      },
      {
        name: 'Headers',
        items: [
          { name: 'Request Headers', count: 25, id: 'http-request-headers' },
          { name: 'Response Headers', count: 20, id: 'http-response-headers' },
          { name: 'Security Headers', count: 12, id: 'http-security-headers' }
        ]
      }
    ],
    content: {
      title: 'HTTP reference',
      description: 'The Hypertext Transfer Protocol (HTTP) is an application-level protocol for distributed, collaborative, hypermedia information systems.',
      sections: [
        {
          title: 'HTTP Methods',
          content: 'HTTP defines a set of request methods to indicate the desired action to be performed for a given resource.',
          links: [
            { name: 'GET', url: '#' },
            { name: 'POST', url: '#' },
            { name: 'PUT', url: '#' },
            { name: 'DELETE', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'http-get': {
        title: 'GET Method',
        description: 'The GET method requests a representation of the specified resource.',
        characteristics: [
          'Requests data from a specified resource',
          'Should only retrieve data and should have no other effect',
          'Can be cached',
          'Remains in the browser history',
          'Can be bookmarked',
          'Should never be used when dealing with sensitive data'
        ],
        example: `GET /api/users HTTP/1.1
Host: example.com
Accept: application/json`
      },
      'http-post': {
        title: 'POST Method',
        description: 'The POST method submits an entity to the specified resource.',
        characteristics: [
          'Submits data to be processed to a specified resource',
          'Data is included in the body of the request',
          'Never cached',
          'Do not remain in the browser history',
          'Cannot be bookmarked',
          'Have no restrictions on data length'
        ],
        example: `POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json

{"name": "John Doe", "email": "john@example.com"}`
      }
    }
  },
  'web-apis': {
    name: 'Web APIs',
    icon: '🔧',
    version: '',
    enabled: true,
    color: 'text-green-600',
    sections: [
      {
        name: 'DOM',
        items: [
          { name: 'Document', count: 85, id: 'webapi-document' },
          { name: 'Element', count: 120, id: 'webapi-element' },
          { name: 'EventTarget', count: 15, id: 'webapi-eventtarget' },
          { name: 'Node', count: 25, id: 'webapi-node' },
          { name: 'Window', count: 45, id: 'webapi-window' },
          { name: 'Navigator', count: 18, id: 'webapi-navigator' }
        ]
      },
      {
        name: 'Storage',
        items: [
          { name: 'localStorage', count: 5, id: 'webapi-localstorage' },
          { name: 'sessionStorage', count: 5, id: 'webapi-sessionstorage' },
          { name: 'IndexedDB', count: 15, id: 'webapi-indexeddb' }
        ]
      },
      {
        name: 'Network',
        items: [
          { name: 'fetch', count: 5, id: 'webapi-fetch' },
          { name: 'XMLHttpRequest', count: 20, id: 'webapi-xhr' },
          { name: 'WebSocket', count: 12, id: 'webapi-websocket' }
        ]
      }
    ],
    content: {
      title: 'Web APIs reference',
      description: 'Web APIs provide functionality that can be used by web applications running in browsers.',
      sections: [
        {
          title: 'DOM APIs',
          content: 'APIs for manipulating the Document Object Model.',
          links: [
            { name: 'Document', url: '#' },
            { name: 'Element', url: '#' },
            { name: 'Node', url: '#' },
            { name: 'EventTarget', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'webapi-fetch': {
        title: 'fetch()',
        description: 'The fetch() method provides an interface for fetching resources (including across the network).',
        syntax: 'fetch(resource, options)',
        examples: [
          {
            title: 'Basic GET Request',
            code: `fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`
          },
          {
            title: 'POST Request',
            code: `fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
})
.then(response => response.json())
.then(data => console.log(data));`
          }
        ]
      }
    }
  },
  git: {
    name: 'Git',
    icon: '📝',
    version: '2.47',
    enabled: true,
    color: 'text-orange-500',
    sections: [
      {
        name: 'Basic Commands',
        items: [
          { name: 'init', count: 1, id: 'git-init' },
          { name: 'clone', count: 1, id: 'git-clone' },
          { name: 'add', count: 1, id: 'git-add' },
          { name: 'commit', count: 1, id: 'git-commit' },
          { name: 'push', count: 1, id: 'git-push' },
          { name: 'pull', count: 1, id: 'git-pull' },
          { name: 'status', count: 1, id: 'git-status' }
        ]
      },
      {
        name: 'Branching',
        items: [
          { name: 'branch', count: 1, id: 'git-branch' },
          { name: 'checkout', count: 1, id: 'git-checkout' },
          { name: 'merge', count: 1, id: 'git-merge' },
          { name: 'rebase', count: 1, id: 'git-rebase' }
        ]
      }
    ],
    content: {
      title: 'Git reference',
      description: 'Git is a free and open source distributed version control system designed to handle everything from small to very large projects.',
      sections: [
        {
          title: 'Basic Commands',
          content: 'Essential Git commands for version control.',
          links: [
            { name: 'git add', url: '#' },
            { name: 'git commit', url: '#' },
            { name: 'git push', url: '#' },
            { name: 'git pull', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'git-commit': {
        title: 'git commit',
        description: 'Record changes to the repository',
        syntax: 'git commit [options]',
        examples: [
          {
            title: 'Basic commit',
            code: `git commit -m "Add new feature"`
          },
          {
            title: 'Commit with detailed message',
            code: `git commit -m "Add user authentication

- Implement login/logout functionality
- Add password hashing
- Create user session management"`
          }
        ],
        options: [
          { name: '-m', description: 'Use the given message as the commit message' },
          { name: '-a', description: 'Automatically stage all modified files' },
          { name: '--amend', description: 'Replace the tip of the current branch' }
        ]
      }
    }
  },
  typescript: {
    name: 'TypeScript',
    icon: '🔷',
    version: '5.6',
    enabled: true,
    color: 'text-blue-600',
    sections: [
      {
        name: 'Basic Types',
        items: [
          { name: 'string', count: 1, id: 'ts-string' },
          { name: 'number', count: 1, id: 'ts-number' },
          { name: 'boolean', count: 1, id: 'ts-boolean' },
          { name: 'array', count: 1, id: 'ts-array' },
          { name: 'object', count: 1, id: 'ts-object' },
          { name: 'any', count: 1, id: 'ts-any' },
          { name: 'void', count: 1, id: 'ts-void' },
          { name: 'null', count: 1, id: 'ts-null' },
          { name: 'undefined', count: 1, id: 'ts-undefined' }
        ]
      },
      {
        name: 'Advanced Types',
        items: [
          { name: 'union', count: 1, id: 'ts-union' },
          { name: 'intersection', count: 1, id: 'ts-intersection' },
          { name: 'generic', count: 1, id: 'ts-generic' },
          { name: 'mapped', count: 1, id: 'ts-mapped' },
          { name: 'conditional', count: 1, id: 'ts-conditional' }
        ]
      },
      {
        name: 'Interfaces',
        items: [
          { name: 'interface', count: 1, id: 'ts-interface' },
          { name: 'extends', count: 1, id: 'ts-extends' },
          { name: 'implements', count: 1, id: 'ts-implements' }
        ]
      }
    ],
    content: {
      title: 'TypeScript reference',
      description: 'TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static type checking.',
      sections: [
        {
          title: 'Type System',
          content: 'TypeScript provides static type checking that helps catch errors at compile time.',
          links: [
            { name: 'Basic Types', url: '#' },
            { name: 'Interfaces', url: '#' },
            { name: 'Classes', url: '#' },
            { name: 'Generics', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'ts-interface': {
        title: 'Interface',
        description: 'Interfaces define contracts within your code and contracts with code outside of your project.',
        syntax: 'interface InterfaceName { property: type; }',
        examples: [
          {
            title: 'Basic Interface',
            code: `interface Person {
  name: string;
  age: number;
  email?: string; // Optional property
}

const user: Person = {
  name: "John Doe",
  age: 30
};`
          },
          {
            title: 'Interface with Methods',
            code: `interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

class BasicCalculator implements Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
  
  subtract(a: number, b: number): number {
    return a - b;
  }
}`
          }
        ]
      },
      'ts-generic': {
        title: 'Generics',
        description: 'Generics allow you to create reusable components that can work with multiple types.',
        syntax: 'function functionName<T>(arg: T): T { return arg; }',
        examples: [
          {
            title: 'Generic Function',
            code: `function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("hello");
let output2 = identity<number>(42);`
          },
          {
            title: 'Generic Interface',
            code: `interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "John" },
  status: 200,
  message: "Success"
};`
          }
        ]
      }
    }
  },
  'vue.js': {
    name: 'Vue.js',
    icon: '🖖',
    version: '3.5.12',
    enabled: true,
    color: 'text-green-500',
    sections: [
      {
        name: 'Composition API',
        items: [
          { name: 'ref', count: 1, id: 'vue-ref' },
          { name: 'reactive', count: 1, id: 'vue-reactive' },
          { name: 'computed', count: 1, id: 'vue-computed' },
          { name: 'watch', count: 1, id: 'vue-watch' },
          { name: 'onMounted', count: 1, id: 'vue-onmounted' },
          { name: 'onUnmounted', count: 1, id: 'vue-onunmounted' }
        ]
      },
      {
        name: 'Directives',
        items: [
          { name: 'v-if', count: 1, id: 'vue-v-if' },
          { name: 'v-for', count: 1, id: 'vue-v-for' },
          { name: 'v-model', count: 1, id: 'vue-v-model' },
          { name: 'v-bind', count: 1, id: 'vue-v-bind' },
          { name: 'v-on', count: 1, id: 'vue-v-on' },
          { name: 'v-show', count: 1, id: 'vue-v-show' }
        ]
      },
      {
        name: 'Components',
        items: [
          { name: 'defineComponent', count: 1, id: 'vue-definecomponent' },
          { name: 'props', count: 1, id: 'vue-props' },
          { name: 'emit', count: 1, id: 'vue-emit' },
          { name: 'slots', count: 1, id: 'vue-slots' }
        ]
      }
    ],
    content: {
      title: 'Vue.js reference',
      description: 'Vue.js is a progressive JavaScript framework for building user interfaces. It is designed to be incrementally adoptable.',
      sections: [
        {
          title: 'Composition API',
          content: 'The Composition API provides a more flexible way to compose component logic.',
          links: [
            { name: 'ref', url: '#' },
            { name: 'reactive', url: '#' },
            { name: 'computed', url: '#' },
            { name: 'watch', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'vue-ref': {
        title: 'ref()',
        description: 'Takes an inner value and returns a reactive and mutable ref object.',
        syntax: 'ref(value)',
        examples: [
          {
            title: 'Basic Ref',
            code: `import { ref } from 'vue'

const count = ref(0)

// Access value
console.log(count.value) // 0

// Mutate value
count.value++
console.log(count.value) // 1`
          },
          {
            title: 'Ref in Template',
            code: `<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">+</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>`
          }
        ]
      },
      'vue-reactive': {
        title: 'reactive()',
        description: 'Returns a reactive proxy of the object.',
        syntax: 'reactive(target)',
        examples: [
          {
            title: 'Reactive Object',
            code: `import { reactive } from 'vue'

const state = reactive({
  count: 0,
  name: 'Vue'
})

// Access properties
console.log(state.count) // 0

// Mutate properties
state.count++
state.name = 'Vue.js'`
          }
        ]
      }
    }
  },
  docker: {
    name: 'Docker',
    icon: '🐳',
    version: '27.3.1',
    enabled: true,
    color: 'text-blue-500',
    sections: [
      {
        name: 'Commands',
        items: [
          { name: 'run', count: 1, id: 'docker-run' },
          { name: 'build', count: 1, id: 'docker-build' },
          { name: 'pull', count: 1, id: 'docker-pull' },
          { name: 'push', count: 1, id: 'docker-push' },
          { name: 'ps', count: 1, id: 'docker-ps' },
          { name: 'stop', count: 1, id: 'docker-stop' },
          { name: 'rm', count: 1, id: 'docker-rm' },
          { name: 'images', count: 1, id: 'docker-images' }
        ]
      },
      {
        name: 'Dockerfile',
        items: [
          { name: 'FROM', count: 1, id: 'docker-from' },
          { name: 'RUN', count: 1, id: 'docker-run-instruction' },
          { name: 'COPY', count: 1, id: 'docker-copy' },
          { name: 'WORKDIR', count: 1, id: 'docker-workdir' },
          { name: 'EXPOSE', count: 1, id: 'docker-expose' },
          { name: 'CMD', count: 1, id: 'docker-cmd' },
          { name: 'ENTRYPOINT', count: 1, id: 'docker-entrypoint' }
        ]
      },
      {
        name: 'Compose',
        items: [
          { name: 'up', count: 1, id: 'docker-compose-up' },
          { name: 'down', count: 1, id: 'docker-compose-down' },
          { name: 'build', count: 1, id: 'docker-compose-build' },
          { name: 'logs', count: 1, id: 'docker-compose-logs' }
        ]
      }
    ],
    content: {
      title: 'Docker reference',
      description: 'Docker is a platform for developing, shipping, and running applications using containerization technology.',
      sections: [
        {
          title: 'Basic Commands',
          content: 'Essential Docker commands for container management.',
          links: [
            { name: 'docker run', url: '#' },
            { name: 'docker build', url: '#' },
            { name: 'docker ps', url: '#' },
            { name: 'docker stop', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'docker-run': {
        title: 'docker run',
        description: 'Run a command in a new container.',
        syntax: 'docker run [OPTIONS] IMAGE [COMMAND] [ARG...]',
        examples: [
          {
            title: 'Basic Container',
            code: `# Run a simple container
docker run hello-world

# Run interactive container
docker run -it ubuntu bash

# Run with port mapping
docker run -p 8080:80 nginx

# Run in background
docker run -d --name my-app nginx`
          }
        ],
        options: [
          { name: '-d, --detach', description: 'Run container in background' },
          { name: '-it', description: 'Interactive mode with TTY' },
          { name: '-p, --publish', description: 'Publish container port to host' },
          { name: '--name', description: 'Assign a name to the container' },
          { name: '-v, --volume', description: 'Bind mount a volume' }
        ]
      },
      'docker-build': {
        title: 'docker build',
        description: 'Build an image from a Dockerfile.',
        syntax: 'docker build [OPTIONS] PATH | URL | -',
        examples: [
          {
            title: 'Basic Build',
            code: `# Build from current directory
docker build .

# Build with tag
docker build -t my-app:latest .

# Build with build args
docker build --build-arg NODE_VERSION=18 -t my-app .`
          }
        ]
      },
      'docker-from': {
        title: 'FROM',
        description: 'Sets the base image for subsequent instructions.',
        syntax: 'FROM <image>[:<tag>] [AS <name>]',
        examples: [
          {
            title: 'Basic FROM',
            code: `FROM node:18

FROM ubuntu:22.04

FROM alpine:3.18 AS builder`
          }
        ]
      }
    }
  },
  mongodb: {
    name: 'MongoDB',
    icon: '🍃',
    version: '8.0',
    enabled: true,
    color: 'text-green-500',
    sections: [
      {
        name: 'CRUD Operations',
        items: [
          { name: 'insertOne', count: 1, id: 'mongo-insertone' },
          { name: 'insertMany', count: 1, id: 'mongo-insertmany' },
          { name: 'find', count: 1, id: 'mongo-find' },
          { name: 'findOne', count: 1, id: 'mongo-findone' },
          { name: 'updateOne', count: 1, id: 'mongo-updateone' },
          { name: 'updateMany', count: 1, id: 'mongo-updatemany' },
          { name: 'deleteOne', count: 1, id: 'mongo-deleteone' },
          { name: 'deleteMany', count: 1, id: 'mongo-deletemany' }
        ]
      },
      {
        name: 'Aggregation',
        items: [
          { name: '$match', count: 1, id: 'mongo-match' },
          { name: '$group', count: 1, id: 'mongo-group' },
          { name: '$sort', count: 1, id: 'mongo-sort' },
          { name: '$project', count: 1, id: 'mongo-project' },
          { name: '$lookup', count: 1, id: 'mongo-lookup' },
          { name: '$unwind', count: 1, id: 'mongo-unwind' }
        ]
      },
      {
        name: 'Indexes',
        items: [
          { name: 'createIndex', count: 1, id: 'mongo-createindex' },
          { name: 'dropIndex', count: 1, id: 'mongo-dropindex' },
          { name: 'getIndexes', count: 1, id: 'mongo-getindexes' }
        ]
      }
    ],
    content: {
      title: 'MongoDB reference',
      description: 'MongoDB is a document database designed for ease of development and scaling.',
      sections: [
        {
          title: 'CRUD Operations',
          content: 'Create, Read, Update, and Delete operations in MongoDB.',
          links: [
            { name: 'insertOne', url: '#' },
            { name: 'find', url: '#' },
            { name: 'updateOne', url: '#' },
            { name: 'deleteOne', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'mongo-find': {
        title: 'find()',
        description: 'Selects documents in a collection or view and returns a cursor to the selected documents.',
        syntax: 'db.collection.find(query, projection)',
        examples: [
          {
            title: 'Basic Find',
            code: `// Find all documents
db.users.find()

// Find with query
db.users.find({ age: { $gte: 18 } })

// Find with projection
db.users.find({}, { name: 1, email: 1, _id: 0 })

// Find with limit and sort
db.users.find().sort({ name: 1 }).limit(10)`
          }
        ],
        methods: [
          { name: 'limit()', description: 'Limits the number of documents returned', example: 'find().limit(5)' },
          { name: 'sort()', description: 'Sorts the documents', example: 'find().sort({ name: 1 })' },
          { name: 'skip()', description: 'Skips a number of documents', example: 'find().skip(10)' },
          { name: 'count()', description: 'Returns the count of documents', example: 'find().count()' }
        ]
      },
      'mongo-group': {
        title: '$group',
        description: 'Groups input documents by the specified _id expression and applies accumulator expressions.',
        syntax: '{ $group: { _id: <expression>, <field1>: { <accumulator1> : <expression1> } } }',
        examples: [
          {
            title: 'Group by Field',
            code: `db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      totalAmount: { $sum: "$amount" },
      orderCount: { $sum: 1 }
    }
  }
])`
          }
        ]
      }
    }
  },
  express: {
    name: 'Express',
    icon: '🚂',
    version: '4.21.1',
    enabled: true,
    color: 'text-gray-600',
    sections: [
      {
        name: 'Application',
        items: [
          { name: 'express()', count: 1, id: 'express-app' },
          { name: 'app.get()', count: 1, id: 'express-get' },
          { name: 'app.post()', count: 1, id: 'express-post' },
          { name: 'app.put()', count: 1, id: 'express-put' },
          { name: 'app.delete()', count: 1, id: 'express-delete' },
          { name: 'app.use()', count: 1, id: 'express-use' },
          { name: 'app.listen()', count: 1, id: 'express-listen' }
        ]
      },
      {
        name: 'Request',
        items: [
          { name: 'req.body', count: 1, id: 'express-req-body' },
          { name: 'req.params', count: 1, id: 'express-req-params' },
          { name: 'req.query', count: 1, id: 'express-req-query' },
          { name: 'req.headers', count: 1, id: 'express-req-headers' }
        ]
      },
      {
        name: 'Response',
        items: [
          { name: 'res.send()', count: 1, id: 'express-res-send' },
          { name: 'res.json()', count: 1, id: 'express-res-json' },
          { name: 'res.status()', count: 1, id: 'express-res-status' },
          { name: 'res.redirect()', count: 1, id: 'express-res-redirect' }
        ]
      },
      {
        name: 'Middleware',
        items: [
          { name: 'express.json()', count: 1, id: 'express-json' },
          { name: 'express.static()', count: 1, id: 'express-static' },
          { name: 'express.urlencoded()', count: 1, id: 'express-urlencoded' }
        ]
      }
    ],
    content: {
      title: 'Express reference',
      description: 'Express is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications.',
      sections: [
        {
          title: 'Routing',
          content: 'Express routing refers to how an application\'s endpoints respond to client requests.',
          links: [
            { name: 'app.get()', url: '#' },
            { name: 'app.post()', url: '#' },
            { name: 'app.put()', url: '#' },
            { name: 'app.delete()', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'express-get': {
        title: 'app.get()',
        description: 'Routes HTTP GET requests to the specified path with the specified callback functions.',
        syntax: 'app.get(path, callback [, callback ...])',
        examples: [
          {
            title: 'Basic GET Route',
            code: `app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  res.json({ users: [] });
});

// Route with parameters
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ user: { id: userId } });
});`
          }
        ]
      },
      'express-post': {
        title: 'app.post()',
        description: 'Routes HTTP POST requests to the specified path with the specified callback functions.',
        syntax: 'app.post(path, callback [, callback ...])',
        examples: [
          {
            title: 'Basic POST Route',
            code: `app.use(express.json()); // Parse JSON bodies

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  // Create user logic here
  const newUser = { id: 1, name, email };
  
  res.status(201).json(newUser);
});`
          }
        ]
      },
      'express-use': {
        title: 'app.use()',
        description: 'Mounts the specified middleware function(s) at the specified path.',
        syntax: 'app.use([path,] callback [, callback...])',
        examples: [
          {
            title: 'Middleware Examples',
            code: `// Application-level middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Built-in middleware
app.use(express.json());
app.use(express.static('public'));

// Router-level middleware
app.use('/api', apiRouter);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});`
          }
        ]
      }
    }
  },
  bootstrap: {
    name: 'Bootstrap',
    icon: '🅱️',
    version: '5.3.3',
    enabled: true,
    color: 'text-purple-600',
    sections: [
      {
        name: 'Layout',
        items: [
          { name: 'Grid System', count: 12, id: 'bootstrap-grid' },
          { name: 'Containers', count: 3, id: 'bootstrap-containers' },
          { name: 'Rows & Columns', count: 8, id: 'bootstrap-rows-cols' },
          { name: 'Gutters', count: 6, id: 'bootstrap-gutters' }
        ]
      },
      {
        name: 'Components',
        items: [
          { name: 'Alerts', count: 8, id: 'bootstrap-alerts' },
          { name: 'Buttons', count: 12, id: 'bootstrap-buttons' },
          { name: 'Cards', count: 6, id: 'bootstrap-cards' },
          { name: 'Modals', count: 5, id: 'bootstrap-modals' },
          { name: 'Navbar', count: 8, id: 'bootstrap-navbar' },
          { name: 'Forms', count: 15, id: 'bootstrap-forms' }
        ]
      },
      {
        name: 'Utilities',
        items: [
          { name: 'Colors', count: 20, id: 'bootstrap-colors' },
          { name: 'Display', count: 8, id: 'bootstrap-display' },
          { name: 'Flex', count: 15, id: 'bootstrap-flex' },
          { name: 'Spacing', count: 25, id: 'bootstrap-spacing' },
          { name: 'Text', count: 12, id: 'bootstrap-text' }
        ]
      }
    ],
    content: {
      title: 'Bootstrap reference',
      description: 'Bootstrap is the world\'s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.',
      sections: [
        {
          title: 'Grid System',
          content: 'Bootstrap\'s grid system uses a series of containers, rows, and columns to layout and align content.',
          links: [
            { name: 'Containers', url: '#' },
            { name: 'Grid system', url: '#' },
            { name: 'Columns', url: '#' },
            { name: 'Breakpoints', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'bootstrap-grid': {
        title: 'Grid System',
        description: 'Bootstrap\'s grid system is built with flexbox and allows up to 12 columns across the page.',
        examples: [
          {
            title: 'Basic Grid',
            code: `<div class="container">
  <div class="row">
    <div class="col">
      Column 1
    </div>
    <div class="col">
      Column 2
    </div>
    <div class="col">
      Column 3
    </div>
  </div>
</div>`
          },
          {
            title: 'Responsive Grid',
            code: `<div class="container">
  <div class="row">
    <div class="col-12 col-md-8">
      Main content
    </div>
    <div class="col-6 col-md-4">
      Sidebar
    </div>
  </div>
</div>`
          }
        ]
      },
      'bootstrap-buttons': {
        title: 'Buttons',
        description: 'Bootstrap includes several predefined button styles, each serving its own semantic purpose.',
        examples: [
          {
            title: 'Button Styles',
            code: `<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>`
          },
          {
            title: 'Button Sizes',
            code: `<button type="button" class="btn btn-primary btn-lg">Large button</button>
<button type="button" class="btn btn-primary">Default button</button>
<button type="button" class="btn btn-primary btn-sm">Small button</button>`
          }
        ]
      }
    }
  },
  sass: {
    name: 'Sass',
    icon: '💅',
    version: '1.80.6',
    enabled: true,
    color: 'text-pink-500',
    sections: [
      {
        name: 'Syntax',
        items: [
          { name: 'Variables', count: 5, id: 'sass-variables' },
          { name: 'Nesting', count: 3, id: 'sass-nesting' },
          { name: 'Mixins', count: 8, id: 'sass-mixins' },
          { name: 'Functions', count: 12, id: 'sass-functions' },
          { name: 'Inheritance', count: 4, id: 'sass-inheritance' }
        ]
      },
      {
        name: 'Built-in Functions',
        items: [
          { name: 'Color Functions', count: 15, id: 'sass-color-functions' },
          { name: 'Math Functions', count: 10, id: 'sass-math-functions' },
          { name: 'String Functions', count: 8, id: 'sass-string-functions' },
          { name: 'List Functions', count: 12, id: 'sass-list-functions' }
        ]
      },
      {
        name: 'At-Rules',
        items: [
          { name: '@import', count: 1, id: 'sass-import' },
          { name: '@use', count: 1, id: 'sass-use' },
          { name: '@forward', count: 1, id: 'sass-forward' },
          { name: '@mixin', count: 1, id: 'sass-mixin-rule' },
          { name: '@include', count: 1, id: 'sass-include' },
          { name: '@extend', count: 1, id: 'sass-extend' }
        ]
      }
    ],
    content: {
      title: 'Sass reference',
      description: 'Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.',
      sections: [
        {
          title: 'Features',
          content: 'Sass provides features that don\'t exist in CSS like variables, nesting, mixins, inheritance and more.',
          links: [
            { name: 'Variables', url: '#' },
            { name: 'Nesting', url: '#' },
            { name: 'Mixins', url: '#' },
            { name: 'Inheritance', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'sass-variables': {
        title: 'Variables',
        description: 'Variables store information that you want to reuse throughout your stylesheet.',
        syntax: '$variable-name: value;',
        examples: [
          {
            title: 'Basic Variables',
            code: `$primary-color: #3498db;
$secondary-color: #2ecc71;
$font-size: 16px;
$margin: 20px;

.header {
  color: $primary-color;
  font-size: $font-size;
  margin: $margin;
}`
          },
          {
            title: 'Default Values',
            code: `$primary-color: #3498db !default;
$border-radius: 4px !default;

// These will use the default values if not defined elsewhere
.button {
  background: $primary-color;
  border-radius: $border-radius;
}`
          }
        ]
      },
      'sass-mixins': {
        title: 'Mixins',
        description: 'Mixins allow you to define styles that can be re-used throughout the stylesheet.',
        syntax: '@mixin name($parameter) { ... } @include name(value);',
        examples: [
          {
            title: 'Basic Mixin',
            code: `@mixin button-style($bg-color, $text-color) {
  background-color: $bg-color;
  color: $text-color;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: darken($bg-color, 10%);
  }
}

.primary-button {
  @include button-style(#3498db, white);
}

.secondary-button {
  @include button-style(#95a5a6, white);
}`
          }
        ]
      },
      'sass-nesting': {
        title: 'Nesting',
        description: 'Sass allows you to nest CSS selectors in a way that follows the same visual hierarchy of your HTML.',
        examples: [
          {
            title: 'Basic Nesting',
            code: `.navbar {
  background: #333;
  padding: 1rem;
  
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    
    li {
      display: inline-block;
      
      a {
        color: white;
        text-decoration: none;
        padding: 0.5rem;
        
        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}`
          }
        ]
      }
    }
  },
  webpack: {
    name: 'webpack',
    icon: '📦',
    version: '5.96.1',
    enabled: true,
    color: 'text-blue-400',
    sections: [
      {
        name: 'Configuration',
        items: [
          { name: 'entry', count: 1, id: 'webpack-entry' },
          { name: 'output', count: 1, id: 'webpack-output' },
          { name: 'module', count: 1, id: 'webpack-module' },
          { name: 'plugins', count: 1, id: 'webpack-plugins' },
          { name: 'devServer', count: 1, id: 'webpack-devserver' },
          { name: 'optimization', count: 1, id: 'webpack-optimization' }
        ]
      },
      {
        name: 'Loaders',
        items: [
          { name: 'babel-loader', count: 1, id: 'webpack-babel-loader' },
          { name: 'css-loader', count: 1, id: 'webpack-css-loader' },
          { name: 'style-loader', count: 1, id: 'webpack-style-loader' },
          { name: 'file-loader', count: 1, id: 'webpack-file-loader' },
          { name: 'url-loader', count: 1, id: 'webpack-url-loader' }
        ]
      },
      {
        name: 'Plugins',
        items: [
          { name: 'HtmlWebpackPlugin', count: 1, id: 'webpack-html-plugin' },
          { name: 'MiniCssExtractPlugin', count: 1, id: 'webpack-css-extract' },
          { name: 'CleanWebpackPlugin', count: 1, id: 'webpack-clean-plugin' },
          { name: 'DefinePlugin', count: 1, id: 'webpack-define-plugin' }
        ]
      }
    ],
    content: {
      title: 'webpack reference',
      description: 'webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser.',
      sections: [
        {
          title: 'Core Concepts',
          content: 'webpack has four core concepts: Entry, Output, Loaders, and Plugins.',
          links: [
            { name: 'Entry', url: '#' },
            { name: 'Output', url: '#' },
            { name: 'Loaders', url: '#' },
            { name: 'Plugins', url: '#' }
          ]
        }
      ]
    },
    detailedContent: {
      'webpack-entry': {
        title: 'Entry',
        description: 'The entry point indicates which module webpack should use to begin building out its internal dependency graph.',
        syntax: 'entry: string | string[] | object',
        examples: [
          {
            title: 'Single Entry',
            code: `module.exports = {
  entry: './src/index.js'
};`
          },
          {
            title: 'Multiple Entries',
            code: `module.exports = {
  entry: {
    app: './src/app.js',
    admin: './src/admin.js'
  }
};`
          }
        ]
      },
      'webpack-output': {
        title: 'Output',
        description: 'The output property tells webpack where to emit the bundles it creates and how to name these files.',
        examples: [
          {
            title: 'Basic Output',
            code: `const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};`
          },
          {
            title: 'Multiple Bundles',
            code: `module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
};`
          }
        ]
      }
    }
  },

  // EXTENSIVE DISABLED DOCUMENTATIONS (keeping existing ones and adding more)
  angular: { name: 'Angular', icon: '🅰️', version: '18', enabled: false, color: 'text-red-600', sections: [], content: { title: 'Angular', description: 'Angular framework documentation', sections: [] } },
  'angular.js': { name: 'Angular.js', icon: '🅰️', version: '1.8', enabled: false, color: 'text-red-500', sections: [], content: { title: 'Angular.js', description: 'AngularJS framework documentation', sections: [] } },
  ansible: { name: 'Ansible', icon: '⚙️', version: '2.15', enabled: false, color: 'text-gray-600', sections: [], content: { title: 'Ansible', description: 'Ansible automation documentation', sections: [] } },
  'apache-http-server': { name: 'Apache HTTP Server', icon: '🪶', version: '2.4.64', enabled: false, color: 'text-orange-500', sections: [], content: { title: 'Apache HTTP Server', description: 'Apache HTTP Server documentation', sections: [] } },
  'apache-pig': { name: 'Apache Pig', icon: '🐷', version: '0.17', enabled: false, color: 'text-orange-500', sections: [], content: { title: 'Apache Pig', description: 'Apache Pig documentation', sections: [] } },
  astro: { name: 'Astro', icon: '🚀', version: '5.10.2', enabled: false, color: 'text-blue-400', sections: [], content: { title: 'Astro', description: 'Astro framework documentation', sections: [] } },
  async: { name: 'Async', icon: '🔄', version: '3.2.0', enabled: false, color: 'text-purple-500', sections: [], content: { title: 'Async', description: 'Async utilities documentation', sections: [] } },
  axios: { name: 'Axios', icon: '📡', version: '1.7.7', enabled: false, color: 'text-blue-600', sections: [], content: { title: 'Axios', description: 'Promise based HTTP client', sections: [] } },
  babel: { name: 'Babel', icon: '🏗️', version: '7.25', enabled: false, color: 'text-yellow-500', sections: [], content: { title: 'Babel', description: 'Babel JavaScript compiler documentation', sections: [] } },
  'backbone.js': { name: 'Backbone.js', icon: '🦴', version: '1.6.0', enabled: false, color: 'text-brown-500', sections: [], content: { title: 'Backbone.js', description: 'Backbone.js MV* framework', sections: [] } },
  bash: { name: 'Bash', icon: '🐚', version: '5.2', enabled: false, color: 'text-gray-700', sections: [], content: { title: 'Bash', description: 'Bash shell documentation', sections: [] } },
  bazel: { name: 'Bazel', icon: '🏗️', version: '3.7.2', enabled: false, color: 'text-green-500', sections: [], content: { title: 'Bazel', description: 'Bazel build system', sections: [] } },
  bluebird: { name: 'Bluebird', icon: '🐦', version: '3.7.2', enabled: false, color: 'text-blue-500', sections: [], content: { title: 'Bluebird', description: 'Bluebird promises library', sections: [] } },
  bottle: { name: 'Bottle', icon: '🍼', version: '0.12.25', enabled: false, color: 'text-green-600', sections: [], content: { title: 'Bottle', description: 'Bottle Python web framework', sections: [] } },
  bower: { name: 'Bower', icon: '📦', version: '1.8.4', enabled: false, color: 'text-orange-400', sections: [], content: { title: 'Bower', description: 'Bower package manager', sections: [] } },
  c: { name: 'C', icon: '©️', version: 'C11', enabled: false, color: 'text-blue-800', sections: [], content: { title: 'C', description: 'C programming language', sections: [] } },
  'c++': { name: 'C++', icon: '➕', version: 'C++23', enabled: false, color: 'text-blue-700', sections: [], content: { title: 'C++', description: 'C++ programming language', sections: [] } },
  cmake: { name: 'CMake', icon: '🔧', version: '3.30', enabled: false, color: 'text-red-500', sections: [], content: { title: 'CMake', description: 'CMake build system', sections: [] } },
  codeceptjs: { name: 'CodeceptJS', icon: '🧪', version: '3.6.10', enabled: false, color: 'text-yellow-600', sections: [], content: { title: 'CodeceptJS', description: 'CodeceptJS testing framework', sections: [] } },
  coffeescript: { name: 'CoffeeScript', icon: '☕', version: '2.7.0', enabled: false, color: 'text-brown-600', sections: [], content: { title: 'CoffeeScript', description: 'CoffeeScript language', sections: [] } },
  cordova: { name: 'Cordova', icon: '📱', version: '12.0.0', enabled: false, color: 'text-gray-600', sections: [], content: { title: 'Cordova', description: 'Apache Cordova mobile development', sections: [] } },
  crystal: { name: 'Crystal', icon: '💎', version: '1.14.0', enabled: false, color: 'text-white-500', sections: [], content: { title: 'Crystal', description: 'Crystal programming language', sections: [] } },
  cypress: { name: 'Cypress', icon: '🌲', version: '13.15.2', enabled: false, color: 'text-green-500', sections: [], content: { title: 'Cypress', description: 'Cypress testing framework', sections: [] } },
  d3: { name: 'D3.js', icon: '📊', version: '7.9.0', enabled: false, color: 'text-orange-600', sections: [], content: { title: 'D3.js', description: 'Data-Driven Documents', sections: [] } },
  deno: { name: 'Deno', icon: '🦕', version: '2.1.0', enabled: false, color: 'text-black-600', sections: [], content: { title: 'Deno', description: 'Deno runtime', sections: [] } },
  django: { name: 'Django', icon: '🎸', version: '5.1', enabled: false, color: 'text-green-700', sections: [], content: { title: 'Django', description: 'Django Python web framework', sections: [] } },
  dom: { name: 'DOM', icon: '🌳', version: '', enabled: false, color: 'text-green-600', sections: [], content: { title: 'DOM', description: 'Document Object Model', sections: [] } },
  'dom-events': { name: 'DOM Events', icon: '⚡', version: '', enabled: false, color: 'text-yellow-500', sections: [], content: { title: 'DOM Events', description: 'DOM Events specification', sections: [] } },
  electron: { name: 'Electron', icon: '⚛️', version: '33.2.0', enabled: false, color: 'text-teal-500', sections: [], content: { title: 'Electron', description: 'Electron framework', sections: [] } },
  elixir: { name: 'Elixir', icon: '💧', version: '1.17', enabled: false, color: 'text-purple-600', sections: [], content: { title: 'Elixir', description: 'Elixir programming language', sections: [] } },
  ember: { name: 'Ember.js', icon: '🔥', version: '5.12.0', enabled: false, color: 'text-orange-600', sections: [], content: { title: 'Ember.js', description: 'Ember.js framework', sections: [] } },
  erlang: { name: 'Erlang', icon: '📞', version: '27', enabled: false, color: 'text-red-600', sections: [], content: { title: 'Erlang', description: 'Erlang programming language', sections: [] } },
  eslint: { name: 'ESLint', icon: '🔍', version: '9.15.0', enabled: false, color: 'text-purple-500', sections: [], content: { title: 'ESLint', description: 'ESLint JavaScript linter', sections: [] } },
  fastapi: { name: 'FastAPI', icon: '⚡', version: '0.115.4', enabled: false, color: 'text-teal-600', sections: [], content: { title: 'FastAPI', description: 'FastAPI Python web framework', sections: [] } },
  flask: { name: 'Flask', icon: '🌶️', version: '3.0.3', enabled: false, color: 'text-gray-700', sections: [], content: { title: 'Flask', description: 'Flask Python web framework', sections: [] } },
  gatsby: { name: 'Gatsby', icon: '🚀', version: '5.13.7', enabled: false, color: 'text-purple-600', sections: [], content: { title: 'Gatsby', description: 'Gatsby static site generator', sections: [] } },
  go: { name: 'Go', icon: '🐹', version: '1.23', enabled: false, color: 'text-cyan-500', sections: [], content: { title: 'Go', description: 'Go programming language', sections: [] } },
  graphql: { name: 'GraphQL', icon: '📊', version: '2024', enabled: false, color: 'text-pink-500', sections: [], content: { title: 'GraphQL', description: 'GraphQL query language', sections: [] } },
  haskell: { name: 'Haskell', icon: 'λ', version: '2010', enabled: false, color: 'text-purple-700', sections: [], content: { title: 'Haskell', description: 'Haskell programming language', sections: [] } },
  jest: { name: 'Jest', icon: '🃏', version: '29.7.0', enabled: false, color: 'text-orange-500', sections: [], content: { title: 'Jest', description: 'Jest JavaScript testing framework', sections: [] } },
  jquery: { name: 'jQuery', icon: '💲', version: '3.7.1', enabled: false, color: 'text-blue-600', sections: [], content: { title: 'jQuery', description: 'jQuery JavaScript library', sections: [] } },
  kotlin: { name: 'Kotlin', icon: '🎯', version: '2.1.0', enabled: false, color: 'text-purple-600', sections: [], content: { title: 'Kotlin', description: 'Kotlin programming language', sections: [] } },
  kubernetes: { name: 'Kubernetes', icon: '☸️', version: '1.31', enabled: false, color: 'text-blue-500', sections: [], content: { title: 'Kubernetes', description: 'Kubernetes orchestration platform', sections: [] } },
  laravel: { name: 'Laravel', icon: '🎭', version: '11.x', enabled: false, color: 'text-red-500', sections: [], content: { title: 'Laravel', description: 'Laravel PHP framework', sections: [] } },
  lodash: { name: 'Lodash', icon: '🔧', version: '4.17.21', enabled: false, color: 'text-blue-400', sections: [], content: { title: 'Lodash', description: 'Lodash JavaScript utility library', sections: [] } },
  markdown: { name: 'Markdown', icon: '📝', version: '', enabled: false, color: 'text-gray-600', sections: [], content: { title: 'Markdown', description: 'Markdown syntax', sections: [] } },
  marionette: { name: 'Marionette.js', icon: '🎭', version: '5.0.0', enabled: false, color: 'text-yellow-600', sections: [], content: { title: 'Marionette.js', description: 'Marionette.js framework', sections: [] } },
  moment: { name: 'Moment.js', icon: '⏰', version: '2.30.1', enabled: false, color: 'text-yellow-500', sections: [], content: { title: 'Moment.js', description: 'Moment.js date library', sections: [] } },
  mongoose: { name: 'Mongoose', icon: '🦫', version: '8.8.1', enabled: false, color: 'text-brown-500', sections: [], content: { title: 'Mongoose', description: 'Mongoose ODM for MongoDB', sections: [] } },
  nginx: { name: 'nginx', icon: '🔧', version: '1.27.2', enabled: false, color: 'text-green-600', sections: [], content: { title: 'nginx', description: 'nginx web server', sections: [] } },
  'next.js': { name: 'Next.js', icon: '▲', version: '15.0.3', enabled: false, color: 'text-black-600', sections: [], content: { title: 'Next.js', description: 'Next.js React framework', sections: [] } },
  numpy: { name: 'NumPy', icon: '🔢', version: '2.1.3', enabled: false, color: 'text-blue-600', sections: [], content: { title: 'NumPy', description: 'NumPy scientific computing', sections: [] } },
  openjdk: { name: 'OpenJDK', icon: '☕', version: '23', enabled: false, color: 'text-red-600', sections: [], content: { title: 'OpenJDK', description: 'OpenJDK Java platform', sections: [] } },
  pandas: { name: 'pandas', icon: '🐼', version: '2.2.3', enabled: false, color: 'text-blue-500', sections: [], content: { title: 'pandas', description: 'pandas data analysis', sections: [] } },
  php: { name: 'PHP', icon: '🐘', version: '8.4', enabled: false, color: 'text-purple-600', sections: [], content: { title: 'PHP', description: 'PHP programming language', sections: [] } },
  postgresql: { name: 'PostgreSQL', icon: '🐘', version: '17', enabled: false, color: 'text-blue-700', sections: [], content: { title: 'PostgreSQL', description: 'PostgreSQL database', sections: [] } },
  prettier: { name: 'Prettier', icon: '💅', version: '3.3.3', enabled: false, color: 'text-pink-500', sections: [], content: { title: 'Prettier', description: 'Prettier code formatter', sections: [] } },
  pug: { name: 'Pug', icon: '🐶', version: '3.0.3', enabled: false, color: 'text-brown-600', sections: [], content: { title: 'Pug', description: 'Pug template engine', sections: [] } },
  redis: { name: 'Redis', icon: '🔴', version: '7.4.1', enabled: false, color: 'text-red-500', sections: [], content: { title: 'Redis', description: 'Redis in-memory database', sections: [] } },
  redux: { name: 'Redux', icon: '🔄', version: '5.0.1', enabled: false, color: 'text-purple-600', sections: [], content: { title: 'Redux', description: 'Redux state management', sections: [] } },
  ruby: { name: 'Ruby', icon: '💎', version: '3.3', enabled: false, color: 'text-red-600', sections: [], content: { title: 'Ruby', description: 'Ruby programming language', sections: [] } },
  'ruby-on-rails': { name: 'Ruby on Rails', icon: '🛤️', version: '7.2.1', enabled: false, color: 'text-red-500', sections: [], content: { title: 'Ruby on Rails', description: 'Ruby on Rails web framework', sections: [] } },
  rust: { name: 'Rust', icon: '🦀', version: '1.82', enabled: false, color: 'text-orange-600', sections: [], content: { title: 'Rust', description: 'Rust programming language', sections: [] } },
  scala: { name: 'Scala', icon: '🎯', version: '3.6.1', enabled: false, color: 'text-red-600', sections: [], content: { title: 'Scala', description: 'Scala programming language', sections: [] } },
  serverless: { name: 'Serverless', icon: '☁️', version: '4.4.6', enabled: false, color: 'text-orange-500', sections: [], content: { title: 'Serverless', description: 'Serverless framework', sections: [] } },
  socketio: { name: 'Socket.IO', icon: '🔌', version: '4.8.1', enabled: false, color: 'text-gray-600', sections: [], content: { title: 'Socket.IO', description: 'Socket.IO real-time communication', sections: [] } },
  sqlite: { name: 'SQLite', icon: '💾', version: '3.47.0', enabled: false, color: 'text-blue-500', sections: [], content: { title: 'SQLite', description: 'SQLite database', sections: [] } },
  svelte: { name: 'Svelte', icon: '🔥', version: '5.14.2', enabled: false, color: 'text-orange-500', sections: [], content: { title: 'Svelte', description: 'Svelte frontend framework', sections: [] } },
  swift: { name: 'Swift', icon: '🐦', version: '6.0.2', enabled: false, color: 'text-orange-500', sections: [], content: { title: 'Swift', description: 'Swift programming language', sections: [] } },
  tailwindcss: { name: 'Tailwind CSS', icon: '🌊', version: '3.4.14', enabled: false, color: 'text-teal-500', sections: [], content: { title: 'Tailwind CSS', description: 'Tailwind CSS utility framework', sections: [] } },
  tensorflow: { name: 'TensorFlow', icon: '🧠', version: '2.18.0', enabled: false, color: 'text-orange-500', sections: [], content: { title: 'TensorFlow', description: 'TensorFlow machine learning', sections: [] } },
  terraform: { name: 'Terraform', icon: '🏗️', version: '1.9.8', enabled: false, color: 'text-purple-500', sections: [], content: { title: 'Terraform', description: 'Terraform infrastructure as code', sections: [] } },
  underscore: { name: 'Underscore.js', icon: '🔗', version: '1.13.7', enabled: false, color: 'text-blue-500', sections: [], content: { title: 'Underscore.js', description: 'Underscore.js utility library', sections: [] } },
  vite: { name: 'Vite', icon: '⚡', version: '6.0.1', enabled: false, color: 'text-purple-600', sections: [], content: { title: 'Vite', description: 'Vite build tool', sections: [] } },
  yii: { name: 'Yii', icon: '🎯', version: '2.0.51', enabled: false, color: 'text-blue-600', sections: [], content: { title: 'Yii', description: 'Yii PHP framework', sections: [] } }
};

// Preferences modal component
const PreferencesModal = ({ isOpen, onClose }) => {
  const { theme, setTheme, isDark } = useTheme();
  
  if (!isOpen) return null;

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`rounded-lg w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className={`flex items-center justify-between p-6 border-b ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>Preferences</h2>
          <button 
            onClick={onClose}
            className={`hover:${isDark ? 'text-gray-300' : 'text-gray-600'} ${
              isDark ? 'text-gray-400' : 'text-gray-400'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            <div>
              <h3 className={`text-lg font-medium mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Enable documentations</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(mockDocumentations).map(([key, doc]) => (
                  <label key={key} className={`flex items-center space-x-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <input 
                      type="checkbox" 
                      checked={doc.enabled}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      readOnly
                    />
                    <span className="flex items-center">
                      <span className="mr-2">{doc.icon}</span>
                      <span>{doc.name}</span>
                      {doc.version && (
                        <span className={`ml-2 text-xs ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>{doc.version}</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className={`text-lg font-medium mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Theme</h3>
              <div className="flex space-x-4">
                <label className={`flex items-center space-x-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <input 
                    type="radio" 
                    name="theme" 
                    value="auto" 
                    checked={theme === 'auto'}
                    onChange={() => handleThemeChange('auto')}
                    className="text-blue-600"
                  />
                  <Monitor className="w-4 h-4" />
                  <span>Auto</span>
                </label>
                <label className={`flex items-center space-x-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <input 
                    type="radio" 
                    name="theme" 
                    value="light" 
                    checked={theme === 'light'}
                    onChange={() => handleThemeChange('light')}
                    className="text-blue-600"
                  />
                  <Sun className="w-4 h-4" />
                  <span>Light</span>
                </label>
                <label className={`flex items-center space-x-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <input 
                    type="radio" 
                    name="theme" 
                    value="dark" 
                    checked={theme === 'dark'}
                    onChange={() => handleThemeChange('dark')}
                    className="text-blue-600"
                  />
                  <Moon className="w-4 h-4" />
                  <span>Dark</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 className={`text-lg font-medium mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Keyboard shortcuts</h3>
              <div className={`space-y-2 text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <div className="flex justify-between">
                  <span>Search</span>
                  <kbd className={`px-2 py-1 rounded border ${
                    isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
                  }`}>/ or s</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Clear search</span>
                  <kbd className={`px-2 py-1 rounded border ${
                    isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
                  }`}>Escape</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Open preferences</span>
                  <kbd className={`px-2 py-1 rounded border ${
                    isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
                  }`}>,</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Welcome component
const WelcomeMessage = ({ onClose }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`border rounded-lg p-6 mb-6 ${
      isDark 
        ? 'bg-green-900 border-green-700' 
        : 'bg-green-50 border-green-200'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className={`text-lg font-semibold mb-2 ${
            isDark ? 'text-green-200' : 'text-green-800'
          }`}>Welcome!</h2>
          <p className={`mb-4 ${
            isDark ? 'text-green-300' : 'text-green-700'
          }`}>
            DevDocs combines multiple API documentations in a fast, organized, and searchable interface. 
            Here's what you should know before you start:
          </p>
          <ol className={`space-y-1 text-sm ${
            isDark ? 'text-green-300' : 'text-green-700'
          }`}>
            <li>1. Open the <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-preferences'))} 
              className="text-blue-600 hover:underline cursor-pointer bg-transparent border-none p-0"
            >Preferences</button> to enable more docs and customize the UI.</li>
            <li>2. You don't have to use your mouse — see the list of keyboard shortcuts (press <kbd className={`px-1 py-0.5 rounded text-xs ${
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
            }`}>,</kbd> for preferences).</li>
            <li>3. The search supports fuzzy matching (e.g. "bgcp" brings up "background-clip").</li>
            <li>4. To search a specific documentation, type its name (or an abbr.), then Tab.</li>
            <li>5. You can search using your browser's address bar — learn how.</li>
            <li>6. DevDocs works offline, on mobile, and can be installed as web app.</li>
            <li>7. For the latest news, follow <a href="https://twitter.com/DevDocs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@DevDocs</a>.</li>
            <li>8. DevDocs is free and <a href="https://github.com/freeCodeCamp/devdocs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">open source</a>. 
              <span className="inline-flex items-center ml-2">
                <span className={`text-xs px-1 rounded ${
                  isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}>★</span>
                <span className="text-xs ml-1">37k</span>
              </span>
            </li>
            <li>9. And if you're new to coding, check out <a href="https://www.freecodecamp.org/learn/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">freeCodeCamp's open source curriculum</a>.</li>
          </ol>
          <p className={`mt-4 font-medium ${
            isDark ? 'text-green-300' : 'text-green-700'
          }`}>Happy coding!</p>
        </div>
        <button 
          onClick={onClose}
          className="text-blue-600 hover:text-blue-800 text-sm ml-4 whitespace-nowrap"
        >
          Stop showing this message
        </button>
      </div>
    </div>
  );
};

// Sidebar component
const Sidebar = ({ searchTerm, setSearchTerm, selectedDoc, onDocSelect, selectedItem, onItemSelect, showWelcome }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [showDisabled, setShowDisabled] = useState(false);
  const { isDark } = useTheme();

  const enabledDocs = Object.entries(mockDocumentations).filter(([_, doc]) => doc.enabled);
  const disabledDocs = Object.entries(mockDocumentations).filter(([_, doc]) => !doc.enabled);

  const toggleSection = (docKey, sectionName) => {
    const key = `${docKey}-${sectionName}`;
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredDocs = useMemo(() => {
    if (!searchTerm) return enabledDocs;
    return enabledDocs.filter(([key, doc]) => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.sections.some(section => 
        section.items.some(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [searchTerm, enabledDocs]);

  return (
    <div className={`w-80 border-r flex flex-col h-full ${
      isDark 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-gray-50 border-gray-200'
    }`}>
      {/* Search */}
      <div className={`p-4 border-b ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDark ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-preferences'))}
            className={`p-2 rounded-md hover:${isDark ? 'bg-gray-700' : 'bg-gray-100'} ${
              isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
            }`}
            title="Preferences"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Documentation list */}
      <div className="flex-1 overflow-y-auto">
        {/* Enabled docs */}
        <div className="p-2">
          {filteredDocs.map(([key, doc]) => (
            <div key={key} className="mb-1">
              <button
                onClick={() => onDocSelect(key)}
                className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-md hover:${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                } transition-colors ${
                  selectedDoc === key 
                    ? isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
                    : isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-2 text-sm">{doc.icon}</span>
                  <span className="font-medium">{doc.name}</span>
                  {doc.version && (
                    <span className={`ml-auto text-xs ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>{doc.version}</span>
                  )}
                </div>
              </button>
              
              {selectedDoc === key && doc.sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="ml-4 mt-1">
                  <button
                    onClick={() => toggleSection(key, section.name)}
                    className={`w-full flex items-center px-3 py-1 text-sm rounded-md hover:${
                      isDark ? 'bg-gray-700' : 'bg-gray-100'
                    } ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {expandedSections[`${key}-${section.name}`] ? 
                      <ChevronDown className="w-3 h-3 mr-1" /> : 
                      <ChevronRight className="w-3 h-3 mr-1" />
                    }
                    {section.name}
                  </button>
                  
                  {expandedSections[`${key}-${section.name}`] && (
                    <div className="ml-6 mt-1">
                      {section.items.map((item, itemIdx) => (
                        <button
                          key={itemIdx}
                          onClick={() => onItemSelect(item.id, item.name)}
                          className={`w-full flex items-center justify-between px-3 py-1 text-sm rounded-md cursor-pointer hover:${
                            isDark ? 'bg-gray-700' : 'bg-gray-100'
                          } text-left ${
                            selectedItem === item.id 
                              ? isDark ? 'bg-blue-800 text-blue-200' : 'bg-blue-50 text-blue-700'
                              : isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          <span>{item.name}</span>
                          {item.count && (
                            <span className={`text-xs ${
                              isDark ? 'text-gray-500' : 'text-gray-400'
                            }`}>{item.count}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Disabled docs section */}
        {!showWelcome && (
          <div className={`border-t p-2 ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div 
              className={`flex items-center px-3 py-2 text-sm cursor-pointer rounded-md hover:${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              } ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
              onClick={() => setShowDisabled(!showDisabled)}
            >
              {showDisabled ? 
                <ChevronDown className="w-3 h-3 mr-1" /> : 
                <ChevronRight className="w-3 h-3 mr-1" />
              }
              <span>DISABLED ({disabledDocs.length})</span>
            </div>
            
            {showDisabled && (
              <div className="ml-4 mt-1">
                {disabledDocs.map(([key, doc]) => (
                  <div key={key} className="mb-1">
                    <div className={`flex items-center px-3 py-2 text-left rounded-md cursor-not-allowed ${
                      isDark ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      <div className="flex items-center">
                        <span className="mr-2 text-sm opacity-50">{doc.icon}</span>
                        <span className="font-medium">{doc.name}</span>
                        {doc.version && (
                          <span className={`ml-auto text-xs ${
                            isDark ? 'text-gray-600' : 'text-gray-400'
                          }`}>{doc.version}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Main content component
const MainContent = ({ selectedDoc, selectedItem, showWelcome, onWelcomeClose }) => {
  const { isDark } = useTheme();

  if (showWelcome) {
    return (
      <div className={`flex-1 overflow-y-auto p-8 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        <WelcomeMessage onClose={onWelcomeClose} />
      </div>
    );
  }

  if (!selectedDoc || !mockDocumentations[selectedDoc]) {
    return (
      <div className={`flex-1 flex items-center justify-center ${
        isDark ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'
      }`}>
        <div className="text-center">
          <BookOpen className={`w-12 h-12 mx-auto mb-4 ${
            isDark ? 'text-gray-600' : 'text-gray-300'
          }`} />
          <p>Select a documentation to get started</p>
        </div>
      </div>
    );
  }

  const doc = mockDocumentations[selectedDoc];

  // Show detailed content for specific items
  if (selectedItem && doc.detailedContent && doc.detailedContent[selectedItem]) {
    const detailedContent = doc.detailedContent[selectedItem];
    
    return (
      <div className={`flex-1 overflow-y-auto ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`border-b px-8 py-4 flex items-center justify-between ${
          isDark 
            ? 'bg-gray-900 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <h1 className={`text-2xl font-semibold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>{detailedContent.title}</h1>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Homepage
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              <ExternalLink className="w-4 h-4 mr-1" />
              Source code
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="max-w-4xl">
            <p className={`mb-8 leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {detailedContent.description}
            </p>

            {detailedContent.syntax && (
              <div className="mb-8">
                <h2 className={`text-xl font-semibold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Syntax</h2>
                <code className={`block p-4 rounded-lg ${
                  isDark ? 'bg-gray-800 text-green-400' : 'bg-gray-100 text-gray-800'
                }`}>
                  {detailedContent.syntax}
                </code>
              </div>
            )}

            {detailedContent.examples && (
              <div className="mb-8">
                <h2 className={`text-xl font-semibold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Examples</h2>
                {detailedContent.examples.map((example, idx) => (
                  <div key={idx} className="mb-6">
                    <h3 className={`text-lg font-medium mb-2 ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>{example.title}</h3>
                    <pre className={`p-4 rounded-lg overflow-x-auto ${
                      isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
                    }`}>
                      <code>{example.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {detailedContent.methods && (
              <div className="mb-8">
                <h2 className={`text-xl font-semibold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Methods</h2>
                <div className="space-y-4">
                  {detailedContent.methods.map((method, idx) => (
                    <div key={idx} className={`border rounded-lg p-4 ${
                      isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <h3 className={`font-semibold mb-2 ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`}>{method.name}</h3>
                      <p className={`mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>{method.description}</p>
                      {method.example && (
                        <code className={`text-sm ${
                          isDark ? 'text-green-400' : 'text-green-600'
                        }`}>
                          {method.example}
                        </code>
                      )}
                      {method.returns && (
                        <p className={`text-sm mt-1 ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Returns: {method.returns}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {detailedContent.properties && (
              <div className="mb-8">
                <h2 className={`text-xl font-semibold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Properties</h2>
                <div className="space-y-4">
                  {detailedContent.properties.map((property, idx) => (
                    <div key={idx} className={`border rounded-lg p-4 ${
                      isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <h3 className={`font-semibold mb-2 ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`}>{property.name}</h3>
                      <p className={`${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>{property.description}</p>
                      {property.example && (
                        <code className={`text-sm ${
                          isDark ? 'text-green-400' : 'text-green-600'
                        }`}>
                          {property.example}
                        </code>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show main documentation content
  return (
    <div className={`flex-1 overflow-y-auto ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Header */}
      <div className={`border-b px-8 py-4 flex items-center justify-between ${
        isDark 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h1 className={`text-2xl font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>{doc.content.title}</h1>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
            <Home className="w-4 h-4 mr-1" />
            Homepage
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
            <ExternalLink className="w-4 h-4 mr-1" />
            Source code
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-4xl">
          <p className={`mb-8 leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {doc.content.description}
          </p>

          {doc.name === 'JavaScript' && (
            <p className={`mb-8 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              If you are new to JavaScript, start with the{' '}
              <a href="#" className="text-blue-600 hover:underline">guide</a>. 
              Once you have a firm grasp of the fundamentals, you can use the reference to get more details on individual objects and language constructs.
            </p>
          )}

          {doc.content.sections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h2 className={`text-xl font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>{section.title}</h2>
              <p className={`mb-4 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>{section.content}</p>
              
              {section.links && (
                <ul className="space-y-1">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="text-blue-600 hover:underline">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main app component
const DevDocsApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Focus search on '/' or 's' key
      if ((e.key === '/' || e.key === 's') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
          e.preventDefault();
          const searchInput = document.querySelector('input[placeholder="Search..."]');
          if (searchInput) {
            searchInput.focus();
          }
        }
      }
      
      // Escape to clear search
      if (e.key === 'Escape' && searchTerm) {
        setSearchTerm('');
      }
      
      // Open preferences with comma key
      if (e.key === ',' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setShowPreferences(true);
        }
      }
    };

    const handleOpenPreferences = () => {
      setShowPreferences(true);
    };

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-preferences', handleOpenPreferences);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-preferences', handleOpenPreferences);
    };
  }, [searchTerm]);

  const handleDocSelect = (docKey) => {
    setSelectedDoc(docKey);
    setSelectedItem(null);
    setShowWelcome(false);
  };

  const handleItemSelect = (itemId, itemName) => {
    setSelectedItem(itemId);
  };

  const handleWelcomeClose = () => {
    setShowWelcome(false);
  };

  return (
    <div className="h-screen flex">
      <Sidebar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDoc={selectedDoc}
        onDocSelect={handleDocSelect}
        selectedItem={selectedItem}
        onItemSelect={handleItemSelect}
        showWelcome={showWelcome}
      />
      <MainContent 
        selectedDoc={selectedDoc}
        selectedItem={selectedItem}
        showWelcome={showWelcome}
        onWelcomeClose={handleWelcomeClose}
      />
      <PreferencesModal 
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
      />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DevDocsApp />} />
          <Route path="/:docId" element={<DevDocsApp />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;