# Answers to Questions

# 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

### `Ans`
So basically, `getElementById` is used when you want to grab one specific unique element from the HTML — since IDs are unique, it always returns just one element. `getElementsByClassName` on the other hand lets you find elements by their class name, and since mutiple elements can share a class, it returns a collection. Now `querySelector` is more of a universal selector — it finds the **first** element that matches any CSS selector you give it (could be an ID, class, tag, whatever). And `querySelectorAll` does the same thing but returns **all** the matching elements instead of just the first one.

---

# 2. How do you create and insert a new element into the DOM?

### `Ans`
To create a new element in the DOM, first you use `document.createElement()` and store it in a variable. After that you can add text, content or styles to it however you need. Then finally to actually make it show up on the page, you attach it to an existing parent element using `parentElement.appendChild()` (or `append()` works to). Without that last step the element just exist in memory but never shows up on the page.

---

# 3. What is Event Bubbling? And how does it work?

### `Ans`
Event bubbling is basically how the browser handles user interactions. When you click on a child element, the event doesnt just stop there — it "bubbles up" throught the DOM. So first the child elements event listener fires, then the event moves up to the immediate parent, then the grandparent, and keeps going all the way up to the root. Thats why sometimes clicking one thing accidentaly triggers listeners on other elements too.

---

# 4. What is Event Delegation in JavaScript? Why is it useful?

### `Ans`
Event delegation is a pattern that takes advantage of event bubbling. Instead of adding an event listener to every single child element (which can get messy and slow), you just put **one** listener on the parent. When a user clicks any child inside it, that click bubbles up to the parent. Then inside the handler function, you can use `event.target` to check exactly which child element was actualy clicked. Its really useful when you have alot of children or when elements are added dynamicaly.

---

# 5. What is the difference between preventDefault() and stopPropagation() methods?

### `Ans`
Both methods are used to control event behavior but they do diffrent things. `preventDefault()` stops the browser from doing it's default action — for example preventing a form from submiting or a link from navigating to a new page. `stopPropagation()` on the other hand dosent care about the default action, it just stops the event from bubbling up the DOM tree so parent elements dont get notified about it.

---