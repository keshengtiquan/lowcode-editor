import { PropsWithChildren } from "react";
import { useComponetsStore } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";
import { useDrop } from "react-dnd";
import { CommonComponentProps } from "../../interface";
import { useMaterailDrop } from "../../hooks/useMaterialDrop";

const Container = ({ id, children }: CommonComponentProps) => {
  const { addComponent } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const {canDrop, drop } = useMaterailDrop(['Button', 'Container'], id);

  return (
    <div
      data-component-id={id}
      ref={drop}
      className="border-[1px] border-[#000] min-h-[100px] p-[20px]"
    >
      {children}
    </div>
  );
};

export default Container;
