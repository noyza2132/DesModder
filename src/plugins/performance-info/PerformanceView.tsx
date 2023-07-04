import PerformanceInfo from ".";
import "./PerformanceView.less";
import { Component, jsx } from "DCGView";
import MainController from "MainController";
import { Button, IconButton, Tooltip } from "components";
import { format } from "i18n/i18n-core";

export class PerformanceView extends Component<{
  controller: () => PerformanceInfo;
  mainController: () => MainController;
}> {
  template() {
    return (
      <div class="dcg-popover-interior dsm-performance-info-menu">
        <div class="dsm-pi-title-row">
          <div class="dcg-popover-title">{format("performance-info-name")}</div>
          <div class="dsm-pi-pin-menu-button-container">
            <Tooltip
              gravity="s"
              tooltip={format("performance-info-sticky-tooltip")}
            >
              <IconButton
                iconClass={"dsm-icon-bookmark"}
                onTap={() => {
                  this.props.mainController().pillboxMenus?.toggleMenuPinned();
                }}
                btnClass={() => ({
                  "dsm-pi-pin-menu-button": true,
                  "dsm-selected":
                    this.props.mainController().pillboxMenus
                      ?.pillboxMenuPinned ?? false,
                })}
              />
            </Tooltip>
          </div>
        </div>
        <ul>
          <li>
            <strong>{format("performance-info-time-in-worker")}: </strong>
            {() =>
              Math.round(this.props.controller().getTimingData().timeInWorker)
            }
            ms
          </li>
          <li>
            <strong>{format("performance-info-compiling")}: </strong>
            {() =>
              Math.round(this.props.controller().getTimingData().updateAnalysis)
            }
            ms
          </li>
          <li>
            <strong>{format("performance-info-rendering")}: </strong>
            {() =>
              Math.round(
                this.props.controller().getTimingData().graphAllChanges
              )
            }
            ms
          </li>
          <li>
            <strong>{format("performance-info-other")}: </strong>
            {() => {
              const timingData = this.props.controller().getTimingData();
              return Math.round(
                timingData.timeInWorker -
                  (timingData.updateAnalysis + timingData.graphAllChanges)
              );
            }}
            ms
          </li>
        </ul>
        <div class="dsm-pi-refresh-state-button-container">
          <Tooltip tooltip={format("performance-info-refresh-graph-tooltip")}>
            <Button
              color="primary"
              class="dsm-pi-refresh-state-button"
              onTap={() => {
                this.props.controller().refreshState();
              }}
            >
              {format("performance-info-refresh-graph")}
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export function MainPopupFunc(
  performanceViewController: PerformanceInfo,
  mainController: MainController
): PerformanceView {
  return (
    <PerformanceView
      controller={() => performanceViewController}
      mainController={() => mainController}
    />
  );
}
