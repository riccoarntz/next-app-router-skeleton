export default function(plop) {
  plop.setGenerator("component", {
    description: "Component generator",
    prompts: [
      {
        name: "template",
        type: "list",
        message: "Which template do you want to use?",
        choices: [
          { name: "page", value: "page" },
          { name: "component", value: "component" },
          { name: "button", value: "button" }
        ]
      },
      {
        name: "type",
        type: "list",
        message: "Which type of component is it?",
        choices: [
          { name: "Atoms", value: "atoms" },
          { name: "Molecules", value: "molecules" },
          { name: "Organisms", value: "organisms" },
          { name: "CMS Block", value: "blocks" },
          { name: "Layout", value: "layout" },
          { name: "Unlisted", value: "unlisted" }
        ],
        when: ({ template }) => template === "component"
      },
      {
        name: "name",
        type: "input",
        message: "What name do you want to use?",
        validate: (value) => (value.length === 0 ? "Please enter a name" : true)
      },
      {
        name: "directory",
        type: "input",
        message: `In what sub-directory do you want to create this? (LEAVE EMPTY when no sub-directory is needed)`,
        when: ({ template }) => template === "component"
      },
      {
        name: "directory",
        type: "input",
        message: `Where in /app/ directory do you want to create this?`,
        when: ({ template }) => template === "page"
      }
    ],
    actions: (userData) => {
      let { type, template, name, directory } = userData;

      // Force button to be a Atom
      if (template === "button") {
        type = "atoms";
      }

      let rootDir = template === "page" ? "app" : `components/${type}`;

      let subFolder;
      if (!directory) {
        subFolder = "";
      } else {
        subFolder = `${directory}/`;
      }

      const data = {
        componentName: `${name}`,
        isCmsComponent: type === "blocks"
      };

      const componentDirName = "{{kebabCase componentName}}";

      const actions = [
        {
          data,
          type: "addMany",
          base: `plop-templates/${template}`,
          templateFiles: `plop-templates/${template}/*.*`,
          destination: `src/${rootDir}/${subFolder}${componentDirName}/`
        }
      ];

      if (data.isCmsComponent) {
        actions.push({
          data,
          type: "append",
          path: "src/components/DynamicComponent.tsx",
          pattern: /(\/\* PLOP_INJECT_TEMPLATE_IMPORT \*\/)/gi,
          template: `import  {{pascalCase componentName}} from '${rootDir}/${subFolder}{{kebabCase componentName}}/{{pascalCase componentName}}';`
        });

        actions.push({
          data,
          type: "append",
          path: "src/components/DynamicComponent.tsx",
          pattern: /(\/\* PLOP_INJECT_TEMPLATE \*\/)/gi,
          template: `  {{camelCase componentName}}: {{pascalCase componentName}},`
        });
      }

      return actions;
    }
  });
}
