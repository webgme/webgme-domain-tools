# Decorator Generator

The helper file, `generateDecorator.js`, uses an existing template directory to generate a directory containing the startup code necessary to create a customized domain specific decorator.  It is run with nodejs, with the name of a domain as a command line argument. 

# Usage

* Run `generateDecorator.js` with nodejs in the command prompt, if using Windows: `node generateDecorator.js domainName`, where `domainName` is the name of the domain to create decorators for
* `domainName` should be one word and not include any special characters other than `_`.  Program will terminate if it detects invalid argument
* By default, the output directory for the new domain is located at `webgmetools\client\decorators`
* If a directory with the same already exists in the decorators directory, user will be asked if to overwrite the existing one.  If user enters `y` then it will be overwritten; otherwise, the program will terminate. 
* Two command line options are also available to avoid any prompt for user input
	- Flag `--q` stands for quiet mode -- when a directory with the name specified by user already exists, this option ensures that such directory is not overwritten. 
		* Example usage: `node generateDecorator.js test --q`
	- Flag `--o` stands for overwrite -- if the directory specified by a user already exists, overwrite it without asking for user's permission
		* Example usage: `node generateDecorator.js test --o`