import { message } from "antd";
import { PropsWithChildren } from "react";
import { useDrop } from "react-dnd";
import { useComponetsStore } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";
import { CommonComponentProps } from "../../interface";
import { useMaterailDrop } from "../../hooks/useMaterialDrop";

function Page({ id, name, children }: CommonComponentProps) {
  const { addComponent } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const {canDrop, drop } = useMaterailDrop(['Button', 'Container'], id);

  return (
    <div
      data-component-id={id}
      ref={drop}
      className="p-[20px] h-[100%] box-border"
      style={{ border: canDrop ? "2px solid blue" : "none" }}
    >
      {children}
    </div>
  );
}

export default Page;
