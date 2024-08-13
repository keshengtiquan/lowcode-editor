import React, { MouseEventHandler, useEffect, useState } from "react";
import { Component, useComponetsStore } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";
import HoverMask from "../HoverMask";
import SelectedMask from "../SelectedMask"

function EditArea() {
  const { components, addComponent, curComponentId, setCurComponentId } = useComponetsStore();
  const { componentConfig, } = useComponentConfigStore();

  const [hoverComponentId, setHoverComponent] = useState<number>();

  const handleClick: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();

    for(let i=0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement
      const componentId = ele.dataset.componentId;

      if(componentId) {
        setCurComponentId(+componentId)
        return;
      }
    }
  }
  const handleMouseOver: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();
    console.log(path);

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement;

      const componentId = ele.dataset.componentId;

      if (componentId) {
        setHoverComponent(+componentId);
        return;
      }
    }
  };

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.component) {
        return null;
      }

      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      );
    });
  }

  return (
    <div
      className="h-[100%] edit-area"
      onMouseOver={handleMouseOver}
      onMouseLeave={() => {
        setHoverComponent(undefined);
      }}
      onClick={handleClick}
    >
      {renderComponents(components)}
      {hoverComponentId && hoverComponentId !== curComponentId &&(
        <HoverMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={hoverComponentId}
        />
      )}
      {curComponentId && (
        <SelectedMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={curComponentId}
        />
      )}
      <div className="portal-wrapper"></div>
    </div>
  );
}

export default EditArea;
