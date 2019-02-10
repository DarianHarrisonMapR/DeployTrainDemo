import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {LineChart} from 'react-easy-chart';
import { CsvToHtmlTable } from 'react-csv-to-table';
import mlp from './nnet.png';
import rforest from './randomForest.png';
/*import getDataFileList from './getDataFilesList.js';*/

const logits = `
feature,coefficient,p-value
intercept,6.332, 0.001
feature1,0.34, 0.142
feature2,-0.21, 0.110
feature3,3.34, 0.094
feature4,0.8242, 0.001
feature5,0.00042, 0.001
feature6,-6.34, 0.001
feature7,0.873, 0.0143
feature8,-2.89, 0.572
feature9,-0.00009, 0.842
feature10,-0.22, 0.042
`;

const importance = `
feature,relative importance
feature3, 1.0
feature10, 0.84
feature4, 0.81
feature2, 0.79
feature5, 0.78
feature7, 0.654
feature8, 0.34
feature1, 0.31
feature6, 0.09
feature9, 0.0005
`;


const metrics = `
model, AUC, KS, Precision, Recall, F1
neural network, 0.87, 42, 0.90, 0.80, 0.86
random forest, 0.88, 39, 0.88, 0.79, 0.84
gradient boosting, 0.82, 41, 0.82, 0.80, 0.81
logistic regression, 0.84, 44, 0.91, 0.83, 0.85
support vector machine, 0.81, 46, 0.88, 0.84, 0.86
ensemble, 0.90, 51, 0.91, 0.89, 0.90
`;

const weights = `
Layer1 Node, Weight, , Layer2 Node, Weight, , Layer3 Node, Weight 
1,0.234,,1,-0.23,,1,-0.23
2,0.253,,2,-0.45,,2,0.45
3,0.83,,3,0.36,,,
4,-0.744,,4,0.88,,,
5,0.47638,,,,,,
6,0.0923,,,,,,
7,-0.532,,,,,,
8,-0.223,,,,,,
9,0.78765,,,,,,
`;

const sampleData = `
name, format
target, int
feature1, double
feature2, double
feature3, double
feature4, double
feature5, double
feature6, double
feature7, double
feature8, double
feature9, double
feature10, double
feature11, double
feature12, double
feature13, double
`;

///// show the results of the file 
class ShowSchema extends React.Component {
  render() {
    return ( <form> <input type="submit" value="SHOW SCHEMA" /> </form>)
  } 
}




class MachineLearning extends React.Component {
      constructor(props) {
    super(props);
    this.state = {
      isNeuralNetworks: false,
      hiddenLayers: 2,
      hiddenLayerNodes: 4.5,
      isLogistigRegression: false,
      isRandomForest:false,
      nrTreesRF:400,
      maxDepth:12,
      isGradientBoosting:false,
      nrTreesGB:200,
      learnRate:.5,
      isSvm:false,
      train:.7,
      dev:.15,
      test:.15,
      randomForest:.3,
      logisticRegression:.3,
      neuralNet:.4,      
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('Logical Object : ' + this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>     
          <input
            name="isNeuralNetworks"
            type="checkbox"
            checked={this.state.isNeuralNetworks}
            onChange={this.handleInputChange} />
        </label>
        Neural Network --->
        <label>
          Hidden Layers:
          <input
            name="hiddenLayers"
            type="number"
            value={this.state.hiddenLayers}
            onChange={this.handleInputChange} />
        </label>
        <label>
          Hidden Layer Nodes:
          <input
            name="hiddenLayerNodes"
            type="number"
            value={this.state.hiddenLayerNodes}
            onChange={this.handleInputChange} />
        </label><br />
        <label>
          <input
            name="isLogistigRegression"
            type="checkbox"
            checked={this.state.islogistigRegression}
            onChange={this.handleInputChange} />
            Logistic Regression
        </label><br />
        <label>
          <input
            name="isRandomForest"
            type="checkbox"
            checked={this.state.israndomForest}
            onChange={this.handleInputChange} />
            Random Forest --->
        </label>
        <label>
          No. Trees:
          <input
            name="nrTreesRF"
            type="number"
            value={this.state.nrTreesRF}
            onChange={this.handleInputChange} />
        </label>
        <label>
          Max Depth:
          <input
            name="maxDepth"
            type="number"
            value={this.state.maxDepth}
            onChange={this.handleInputChange} />
        </label><br />
        <label>
          <input
            name="isGradientBoosting"
            type="checkbox"
            checked={this.state.israndomForest}
            onChange={this.handleInputChange} />
            Gradient Boosting --->
        </label>        
        <label>
          No Trees:
          <input
            name="nrTreesGB"
            type="number"
            value={this.state.nrTreesGB}
            onChange={this.handleInputChange} />
        </label>
        <label>
          learnRate:
          <input
            name="learnRate"
            type="number"
            value={this.state.learnRate}
            onChange={this.handleInputChange} />
        </label>        
        <label><br />   
          <input
            name="isSvm"
            type="checkbox"
            checked={this.state.isSvm}
            onChange={this.handleInputChange} />
        </label>SVM<br />              
      </form>
    );
  }
}

class Choices extends React.Component {
      constructor(props) {
    super(props);
    this.state = {
          train:.7,
          dev:.15,
          test:.15,
          randomForest:.3,
          logisticRegression:.3,
          neuralNet:.4,

    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('Train with Params : ' + this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <b>Train Sample Ratio</b><br />
        <label>
          Train
          <input
            name="train"
            type="number"
            value={this.state.train}
            onChange={this.handleInputChange} />
        </label>
        <label>
          Dev
          <input
            name="dev"
            type="number"
            value={this.state.dev}
            onChange={this.handleInputChange} />
        </label>
        <label>
          Test
          <input
            name="test"
            type="number"
            value={this.state.test}
            onChange={this.handleInputChange} />
        </label><br /><br />
        <b>Weighting for Ensemble</b><br />
        <label>
          Random Forest
          <input
            name="randomForest"
            type="number"
            value={this.state.randomForest}
            onChange={this.handleInputChange} />
        </label>
        <label>
          Logistic Regression
          <input
            name="logisticRegression"
            type="number"
            value={this.state.logisticRegression}
            onChange={this.handleInputChange} />
        </label>
        <label>
          Neural Net
          <input
            name="neuralNet"
            type="number"
            value={this.state.neuralNet}
            onChange={this.handleInputChange} />
        </label><br /><br />
        <input type="submit" value="Train Model(s)" /><input type="submit" value="manual Halt" />
      </form>
    );
  }
}

///// Get file input from user
class InputFile extends React.Component {
  render() {
    const filename = this.props.filename;
    return (
      <form >
       <label> Enter the file name: <input type="text" value={filename} /> </label>
       <input type="submit" value="LOAD FILE" />
      </form>
    );
  }
}


class SaveModels extends React.Component {
      constructor(props) {
    super(props);
    this.state = {
      isNN: false,
      pathNN: '',
      isGBT: false,
      pathGBT: '',
      isRF: false,
      pathRF: '',
      isLR: false,
      pathLR: '',
      isSVM: false,
      pathSVM: '',
      isEnsemble: false,
      pathEnsemble:'',                               
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



 handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('Save Models : ' + this.state);
    event.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>     
          <input
            name="isNN"
            type="checkbox"
            checked={this.state.isNN}
            onChange={this.handleInputChange} />
        </label>
        Neural Network --->
        <label>
          Save model:
          <input
            name="pathNN"
            type="string"
            value={this.state.pathNN}
            onChange={this.handleInputChange} />
        </label><br />
        <label>     
          <input
            name="isGBT"
            type="checkbox"
            checked={this.state.isGBT}
            onChange={this.handleInputChange} />
        </label>
        Gradient Boosted Trees --->
        <label>
          Save model:
          <input
            name="pathGBT"
            type="string"
            value={this.state.pathGBT}
            onChange={this.handleInputChange} />
        </label><br />
        <label>     
          <input
            name="isRF"
            type="checkbox"
            checked={this.state.isRF}
            onChange={this.handleInputChange} />
        </label>
        Random Forest --->
        <label>
          Save model:
          <input
            name="pathRF"
            type="string"
            value={this.state.pathRF}
            onChange={this.handleInputChange} />
        </label><br />
        <label>     
          <input
            name="isLR"
            type="checkbox"
            checked={this.state.isLR}
            onChange={this.handleInputChange} />
        </label>
        Logistic Regression --->
        <label>
          Save model:
          <input
            name="pathLR"
            type="string"
            value={this.state.pathLR}
            onChange={this.handleInputChange} />
        </label><br />
        <label>     
          <input
            name="isSVM"
            type="checkbox"
            checked={this.state.isSVM}
            onChange={this.handleInputChange} />
        </label>
        SVM --->
        <label>
          Save model:
          <input
            name="pathSVM"
            type="string"
            value={this.state.pathSVM}
            onChange={this.handleInputChange} />
        </label><br />
        <label>     
          <input
            name="isEnsemble"
            type="checkbox"
            checked={this.state.isEnsemble}
            onChange={this.handleInputChange} />
        </label>
        ENSEMBLE --->
        <label>
          Save model:
          <input
            name="pathEnsemble"
            type="string"
            value={this.state.pathEnsemble}
            onChange={this.handleInputChange} />
        </label><br />
        <input type="submit" value="Submit" />                                     
      </form>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props); this.state = {filename: 'features.csv'}
  }


  render() {
    var filename = this.state.filename;

    return (
      <div>
        <h1> User-Driven, Model Deployment Demo </h1>
	<h4> First stage of a two-part demo. First, a model is trained. <br />
	Users can hover over each section for a tutorial on model-building.<br />
	In part two, the trained models are deployed and monitored. <br />
        </h4>
        <p><b>1. User uploads file or selects from list (csv, etc.) ... </b></p>
        <InputFile onFileSubmit={this.handleFileInput} />
        <p><b>2. Show the schema and allow for some user manipulation (create a feature).</b></p>
        <ShowSchema filename={filename}/>
        <CsvToHtmlTable data={sampleData} csvDelimiter="," tableClassName="table table-striped table-hover"/> 
        <p><b>3. Provide user choice for classification algorithms ...</b></p>
        <MachineLearning/>
        <p><b>4. Based on algorithms selected, get additional training parameters ...</b></p>
        <Choices/>
        <p><b>5. Interpreting models & Threshold Analysis...</b></p>
	<p>Neural Network Weights </p>
        <img src={mlp} alt="Logo" />
        <CsvToHtmlTable data={weights} csvDelimiter="," tableClassName="table table-striped table-hover"/> 
	<p>Random Forest - Feature Importance </p>
        <img src={rforest} alt="Logo" />
        <CsvToHtmlTable data={importance} csvDelimiter="," tableClassName="table table-striped table-hover"/> 
	<p>Logistic Regression - Coefficient Interpretation </p>
        <CsvToHtmlTable data={logits} csvDelimiter="," tableClassName="table table-striped table-hover"/> 
        <p><b>6. Model performance metrics ...</b></p>
        <CsvToHtmlTable data={metrics} csvDelimiter="," tableClassName="table table-striped table-hover"/> 
        <p><b>7. ROC's for algorithms ...</b></p>
        <LineChart
         axes
         axisLabels={{x: 'true positive (%)', y: 'false positive (%)'}}
         margin={{top: 10, right: 10, bottom: 50, left: 50}}
         width={500} 
         interpolate={'cardinal'} 
         height={350}
         data={[ [ {x:0.0,y:0.0},{ x: 0.1, y: 0.30 }, { x: 0.2, y: 0.50 }, { x: 0.3, y: 0.60 },{x:0.5,y:0.8},{x:1.0, y:1.0}], [ {x:0.0,y:0.0},{ x: 0.1, y: 0.35 }, { x: 0.2, y: 0.55 }, { x: 0.3, y: 0.70 },{x:0.5,y:0.85},{x:1.0, y:1.0}] ]}
        />
        <p><b>8. Allow user to save model (or ensemble) ...</b></p>
        <SaveModels/>
      </div>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

