# toastjs Documentation
ToastJS is a lightweight JavaScript library that allows you to display customizable toast notifications on your web page. Toast notifications are non-intrusive messages that pop up momentarily to provide users with important information, alerts, or notifications.

## Installation

To use ToastJS in your project, you can either download the library and include it in your HTML file or install it using npm:
```
npm i @grenishrai/toastjs
```
## Usage
### Creating a Toast
To create a toast notification, first, import the Toast class and create an instance with custom options:
```
import Toast from "toastjs";

const options = {
  text: "Hello, ToastJS!", // The content of the toast
  position: "top-right",   // Optional: Position of the toast ("top-left", "top-right", "bottom-left", "bottom-right")
  isProgress: true,        // Optional: Whether to show a progress bar (true/false)
  autoClose: 5000,         // Optional: Auto-close time in milliseconds (0 or false to disable auto-close)
};

const toast = new Toast(options);
```
### Customizing Toast Options
ToastJS supports various customizable options when creating a toast:
1. text (string): The content of the toast message.
2. position (string, optional): The position of the toast on the screen. Available options are "top-left", "top-right", "bottom-left", and "bottom-right". The default position is "top-right".
3. isProgress (boolean, optional): Whether to show a progress bar with a timer. The progress bar indicates the time left before the toast auto-closes. The default value is true.
4. autoClose (number, optional): The time in milliseconds after which the toast will automatically close. If set to 0 or false, the toast won't auto-close. The default auto-close time is 5000ms (5 seconds).
5. canClose (boolean, optional): Whether the user can manually close the toast by clicking on it. The default value is true.

### Updating Toast Content
You can update the content of the toast dynamically after creating it:
```
toast.text = "Updated message"; // Change the text of the toast
```
### Removing Toast
To remove the toast manually, call the remove() method:
```
toast.remove(); // Removes the toast from the screen
```
### Example
Here's a simple example of using ToastJS to display a notification when a button is clicked:
```
<!DOCTYPE html>
<html>
<head>
  <title>ToastJS Example</title>
</head>
<body>
  <button id="showToastBtn">Show Toast</button>

  <script type="module">
    import Toast from "toastjs";

    document.getElementById("showToastBtn").addEventListener("click", () => {
      const options = {
        text: "Hello, ToastJS!",
        position: "top-right",
        isProgress: true,
        autoClose: 5000,
      };

      const toast = new Toast(options);
    });
  </script>
</body>
</html>
```
## Conclusion
ToastJS is a simple and effective library for displaying toast notifications on your web page. With its customizable options and easy-to-use API, you can create and manage toast notifications to provide a better user experience.
