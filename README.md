# VirtualWorld

**VirtualWorld** is an immersive simulation project designed to showcase AI-powered self-driving cars within a virtual environment. The project incorporates machine learning algorithms to enable cars to navigate complex routes, avoid obstacles, and make autonomous decisions in real time.

## Features

- **Self-Driving Simulation:** Virtual cars navigate autonomously through traffic, avoid obstacles, and make smart decisions based on environmental factors.
- **Machine Learning Integration:** AI models are trained to control car movements such as speed, steering, and lane-switching.
- **Interactive Environment:** A visually dynamic world with various road scenarios, including intersections, turns, and traffic signals.
- **Customizable Settings:** Users can configure traffic density, car speed, and simulation parameters to test different scenarios.

## Tech Stack

- **Frontend:** JavaScript (vanilla), HTML5, CSS3
- **Machine Learning:** TensorFlow.js (for implementing the neural network)
- **Simulation:** Custom-built physics engine for realistic car movements

## How to Run

1. Clone this repository:
    ```bash
    git clone https://github.com/username/VirtualWorld.git
    ```

2. Open the project folder in **Visual Studio Code**.

3. Install the Live Server extension in VSCode:
   - Go to the Extensions tab in VSCode and search for "Live Server."
   - Install the extension by **Ritwick Dey**.

4. Once installed, open the `index.html` file.

5. Right-click on the `index.html` file and select **Open with Live Server**.

6. The project will automatically open in your browser at `http://localhost:5500`.

## Neural Network Configuration

- The neural network is trained using a dataset of simulated driving scenarios.
- **Input:** Camera view (pixels) and sensor data from the virtual environment.
- **Output:** Steering angles, speed control, and lane-switching decisions.
- **Training:** You can retrain the model by modifying the `trainModel.js` script, using TensorFlow.js.

## Future Enhancements

- Implement multi-agent simulations with multiple self-driving cars interacting in the same environment.
- Add more complex road layouts, weather conditions, and dynamic obstacles (e.g., pedestrians).
- Introduce VR support for a more immersive user experience.

## Contributing

Feel free to contribute to the project by creating a pull request or submitting an issue. Check out the open issues for areas that need improvement.

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

**Author:** Hanafe Mira  
