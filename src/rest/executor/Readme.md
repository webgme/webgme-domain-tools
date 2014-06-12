## Execution framework  ##

Provides a RESTful interface for executing generated artifacts.

### TODO ###

### Requirements ###

1. Users should be able to register their computers as executor slaves
* Executor should support one or multiple backend services at the same time.
* Backend services can be (a) a single execution node on server side, (b) jenkins with multiple slaves, and (c) 
amazon workflow.
* Jobs are identified by a unique id, which is the hash of the source data in from the BLOB storage.
* Result hash is written back to the BLOB storage
* Job status can be queried.
* Job status must contain
    a. source artifact hash
    * result hash if available or `null`
    * start time using ISO 8601 format
    * finish time using ISO 8601 format or `null`
    * status enumeration `CREATED`, `SUCCESS`, `FAILED`, ...

### Limitations ###


### Design ###

TODO: explain usage and rest end points...