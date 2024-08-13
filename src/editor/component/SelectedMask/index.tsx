import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { getComponentById, useComponetsStore } from "../../stores/components";
import { Popconfirm, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface SelectedMaskProps {
  portalWrapperClassName: string;
  containerClassName: string;
  componentId: number;
}

function SelectedMask({
  containerClassName,
  portalWrapperClassName,
  componentId,
}: SelectedMaskProps) {
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  });

  const { components, curComponentId } = useComponetsStore();

  useEffect(() => {
    updatePosition();
  }, [componentId]);

  function updatePosition() {
    if (!componentId) return;

    const container = document.querySelector(`.${containerClassName}`);
    if (!container) return;

    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;

    const { top, left, width, height } = node.getBoundingClientRect();
    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();

    let labelTop = top - containerTop + container.scrollTop;
    let labelLeft = left - containerLeft + width;

    if (labelTop <= 0) {
      labelTop -= -20;
    }

    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollTop,
      width,
      height,
      labelTop,
      labelLeft,
    });
  }

  const el = useMemo(() => {
    return document.querySelector(`.${portalWrapperClassName}`)!;
  }, []);

  const curComponent = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId]);

  function handleDelete() {}

  return createPortal(
    <>
      <div> </div>
      <div >
        <Space>
          <div
            style={{
              padding: "0 8px",
              backgroundColor: "blue",
              borderRadius: 4,
              color: "#fff",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {curComponent?.name}
          </div>
          {curComponentId !== 1 && (
            <div style={{ padding: "0 8px", backgroundColor: "blue" }}>
              <Popconfirm
                title="确认删除？"
                okText={"确认"}
                cancelText={"取消"}
                onConfirm={handleDelete}
              >
                <DeleteOutlined style={{ color: "#fff" }} />
              </Popconfirm>
            </div>
          )}
        </Space>
      </div>
    </>,
    el
  );
}

export default SelectedMask;
