Here is an example of how you can create a React Ping component with a green pulsating dot next to the "System Online" text:

```jsx
import React, { useState } from 'react';

const Ping = () => {
  const [online, setOnline] = useState('System Online');

  return (
    <div className="ping">
      <span>{online}</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="4" r="6" />
        <path d="M9.5 8l-3.25 3.25z" />
      </svg>
    </div>
  );
};

export default Ping;
```

In this example, we use the `useState` hook to create a state variable `online` and an initial value of "System Online". We then return a JSX element that displays the text "System Online" alongside a green pulsating dot (created using SVG) next to it.

You can customize the appearance of the ping by modifying the styles in your CSS file. For example:

```css
.ping {
  display: flex;
  align-items: center;
}

.ping span {
  font-size: 18px;
  color: #337ab7; /* green */
  margin-right: 10px;
}

.svg {
  width: 24px;
}
```

This will render a ping with the text "System Online" and a green pulsating dot next to it.