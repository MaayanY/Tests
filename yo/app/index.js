const PATH = require('path');
const FS = require('fs');
const glob = require('glob');

const Base = require('yeoman-generator').Base;
const _ = require('lodash');
const colors = require('colors/safe');
const moment = require('moment');

const params = {};

const kebabCaseFilter = function(value) {
    
    return _.chain(value).kebabCase().value();
};

const print = function(message, colorFn) {
    console.log(colorFn(message));
};

module.exports = Base.extend({
    prompting: function () {
        print('---------------------------------------', colors.bold.magenta);
        print('1. Avoid adding the words "Component" or "Container" - ', colors.bold.magenta);
        print('2. Verify that you create the component under "components/" folder.', colors.bold.magenta);
        print('3. Name your components using kebabCase:".', colors.bold.magenta);
        print('   for example, "ItemList".', colors.bold.magenta);
        print('---------------------------------------', colors.bold.magenta);

        const prompts = [
            {
                type: 'input', 
                name: 'name', 
                message: 'Component name:', 
                store: false, 
                default: 'test-component', 
                filter: kebabCaseFilter
            },
            {
                type: 'input', 
                name: 'location', 
                message: 'Location:', 
                store: false, 
                default: 'components'
            },
            {
                type: 'confirm', 
                name: 'install', 
                message: 'Install?', 
                store: false, 
                default: false
            }
        ];

        const done = this.async();

        this.prompt(prompts, (answers) => {
            Object.assign(params, answers);
            params.capitalName = _.chain(params.name).camelCase().upperFirst().value();
            params.camelCaseName = _.chain(params.name).camelCase().lowerFirst().value();
            done();
        });            
    },

    writing: function() {
        const target = PATH.resolve(params.location, params.name);
        const componentFile = PATH.resolve(this.destinationRoot(target), 'src/Component.js');
        const componentActionsFile = PATH.resolve(this.destinationRoot(target), 'src/ComponentActions.js');
        const componentI18File = PATH.resolve(this.destinationRoot(target), 'src/Component.i18n.js');
        const componentTargetFile = PATH.resolve(this.destinationRoot(target), 'src/' + params.capitalName + '.js');
        const componentActionsTargetFile = PATH.resolve(this.destinationRoot(target), 'src/' + params.camelCaseName + 'Actions.js');
        const componentI18TargetFile = PATH.resolve(this.destinationRoot(target), 'src/' + params.camelCaseName + '.i18n.js');
        const componentSpecsFile = PATH.resolve(this.destinationRoot(target), 'test/Component.specs.js');
        const componentSpecsTargetFile = PATH.resolve(this.destinationRoot(target), 'test/' + params.camelCaseName + '.specs.js');

        const componentCSSFile = PATH.resolve(this.destinationRoot(target), 'demo/public/css/Component.css');
        const componentCSSTargetFile = PATH.resolve(this.destinationRoot(target), 'demo/public/css/'+ params.camelCaseName + '.css');
        
        this.fs.copyTpl(this.templatePath('**/*'), this.destinationRoot(target), params);
        this.fs.copy(this.templatePath('**/.*'), this.destinationRoot(target));
        this.fs.move(componentFile, componentTargetFile);
        this.fs.move(componentActionsFile, componentActionsTargetFile);
        this.fs.move(componentI18File, componentI18TargetFile);
        this.fs.move(componentSpecsFile, componentSpecsTargetFile);
        this.fs.move(componentCSSFile, componentCSSTargetFile);
    },

    install: function() {
        const target = this.destinationRoot();

        glob(target + '/**/*', {}, (err, files) => {
            if (!err) {
                files.forEach((file) => {
                    FS.chmodSync(file, 0700);                    
                });
            } else {
                console.log(err);
            }            
        });
        
        if(params.install) {
            this.npmInstall();            
        }
    }
});
