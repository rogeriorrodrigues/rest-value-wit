import {
  IWorkItemChangedArgs,
  IWorkItemFieldChangedArgs,
  IWorkItemLoadedArgs,
} from "azure-devops-extension-api/WorkItemTracking";
import * as SDK from "azure-devops-extension-sdk";
import * as React from "react";
import { showRootComponent } from "../../Common";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { Observer } from "azure-devops-ui/Observer";
import { DropdownMultiSelection } from "azure-devops-ui/Utilities/DropdownSelection";
import { dropdownItems } from "./Data";

interface WorkItemFormGroupComponentState {
  eventContent: string;
}

export class WorkItemFormGroupComponent extends React.Component<{}, WorkItemFormGroupComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      eventContent: ""
    };
  }

  public componentDidMount() {
    SDK.init().then(() => {
      this.registerEvents();
    });
  }
  private selection = new DropdownMultiSelection();

  public render(): JSX.Element {

    return (
      <div>
        <Observer selection={this.selection}>
          {() => {
            return (
              <Dropdown
                ariaLabel="Multiselect"
                actions={[
                  {
                    className: "bolt-dropdown-action-right-button",
                    disabled: this.selection.selectedCount === 0,
                    iconProps: { iconName: "Clear" },
                    text: "Clear",
                    onClick: () => {
                      this.selection.clear();
                    }
                  }
                ]}
                className="example-dropdown"
                items={dropdownItems}
                selection={this.selection}
                placeholder="Select an Option"
                showFilterBox={true}
              />
            );
          }}
        </Observer>
      </div>
    );
  }

  private _setSelected = async (values: string[]): Promise<void> => {
    const formService = await SDK.getService("ms.vss-web.form-data-service");
    console.log("FormService", formService);

    formService.setFieldValue(this.fieldName, values.join(";"));
    return new Promise<void>((resolve) => {
      this._onRefreshed = resolve;
    });
  }

  private registerEvents() {
    SDK.register(SDK.getContributionId(), () => {
      return {

        // Called when the active work item is modified
        onFieldChanged: (args: IWorkItemFieldChangedArgs) => {
          this.setState({
            eventContent: `onFieldChanged - ${JSON.stringify(args)}`
          });

        },

        // Called when a new work item is being loaded in the UI
        onLoaded: (args: IWorkItemLoadedArgs) => {
          this.setState({
            eventContent: `onLoaded - ${JSON.stringify(args)}`
          });
        },

        // Called when the active work item is being unloaded in the UI
        onUnloaded: (args: IWorkItemChangedArgs) => {
          this.setState({
            eventContent: `onUnloaded - ${JSON.stringify(args)}`
          });
        },

        // Called after the work item has been saved
        onSaved: (args: IWorkItemChangedArgs) => {
          this.setState({
            eventContent: `onSaved - ${JSON.stringify(args)}`
          });
        },

        // Called when the work item is reset to its unmodified state (undo)
        onReset: (args: IWorkItemChangedArgs) => {
          this.setState({
            eventContent: `onReset - ${JSON.stringify(args)}`
          });
        },

        // Called when the work item has been refreshed from the server
        onRefreshed: (args: IWorkItemChangedArgs) => {
          this.setState({
            eventContent: `onRefreshed - ${JSON.stringify(args)}`
          });
        }
      };
    });
  }

}

export default WorkItemFormGroupComponent;

showRootComponent(<WorkItemFormGroupComponent />);
