class NeuralNetwork {
    constructor(neuronCounts) {
        this.model = this.#createModel(neuronCounts);
        console.log(this.model);  // Debug: Check if the model is created
    }

    #createModel(neuronCounts) {
        const model = tf.sequential();

        // Input layer
        model.add(tf.layers.dense({
            units: neuronCounts[1],
            inputShape: [neuronCounts[0]],
            activation: 'sigmoid'
        }));

        // Hidden layers
        for (let i = 1; i < neuronCounts.length - 1; i++) {
            model.add(tf.layers.dense({
                units: neuronCounts[i + 1],
                activation: 'sigmoid'
            }));
        }

        console.log("Model created:", model);  // Debug: Log the model
        return model;
    }

    async loadWeights(weightsArray) {
        const weights = weightsArray.map(weightData =>
            tf.tensor(weightData.values, weightData.shape)
        );
        await this.model.setWeights(weights);
    }

    static feedForward(givenInputs, network) {
        if (!network.model) {
            console.error("Model not initialized!");  // Debug: Error if model is undefined
            return;
        }

        const inputTensor = tf.tensor2d([givenInputs]);
        const outputTensor = network.model.predict(inputTensor);
        return outputTensor.dataSync();
    }

    static mutate(network, amount = 1) {
        if (!network.model) {
            console.error("Model not initialized!");  // Debug: Error if model is undefined
            return;
        }

        const weights = network.model.getWeights();
        const newWeights = weights.map(weightTensor => {
            const values = weightTensor.dataSync();
            const shape = weightTensor.shape;
            const mutatedValues = values.map(value => lerp(value, Math.random() * 2 - 1, amount));
            return tf.tensor(mutatedValues, shape);
        });
        network.model.setWeights(newWeights);
    }
}

class Level {
    constructor(inputCount, outputCount) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weights = [];
        for (let i = 0; i < inputCount; i++) {
            this.weights[i] = new Array(outputCount);
        }

        Level.#randomize(this);
    }

    static #randomize(level) {
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                level.weights[i][j] = Math.random() * 2 - 1;
            }
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }
    }

    static feedForward(givenInputs, level) {
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = givenInputs[i];
        }

        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }

            if (sum > level.biases[i]) {
                level.outputs[i] = 1;
            } else {
                level.outputs[i] = 0;
            }
        }

        return level.outputs;
    }
}
