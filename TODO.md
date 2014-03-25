# TODO items #

## Plugin Manager ##
* Get configuration from the user
* Execute a specific plugin on server side
* Execute a specific plugin on client side
* Get results of the plugin
* Visualization of plugin's results

## Analysis execution framework ##
* Execution of generated artifacts.
* On server and client.
* Artifacts storage.

## Result visualization ##
* Link analysis results with the models.
* Visualize analysis results in the model (like dashboard).

## Logging ##
* Same API on server- and client side.
* Passable from Plugin Manager and testing-framework.

## FileSystem API for plugins ##
* FS API should look like the same on server side and on client side.

## Testing ##
* Client side testing using `karma`

### Mocks ###
* Create `StorageMock`
* Refine `CoreMock.js`
* webGME model to mock-tree.
* mock tree to graph for debugging?

### Coverage ###
* Get coverage report for client side tests

### Generating tests based on a model from the project ###


## Domain Specific API ##
* Resolve importing using multiple files.
* Get children.
* Get connections.
* DSML help for creating valid connections (?)
* Trace instance chain.
* Parent.
* Other languages?

### Debugging ###
* Generate the meta model as a graph


# Use cases #

## Targeted Plugins and Addons ##
* Modelica composer
* Modelica importer
* Formula propagation to subsystems (client side)
* Calculate specific aggregated properties of all subsusyems and components e.g. mass
* Parametric exploration of Modelica models


