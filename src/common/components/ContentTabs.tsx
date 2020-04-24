import React from 'react';
import { RadioChangeEvent } from 'antd/lib/radio';
import FormRadio from 'common/components/Form/FormRadio';

interface ITab {
  title: string;
  content: JSX.Element | null;
}

interface IComponentState {
  activeTab: string;
}

interface IComponentProps {
  tabs: ITab[];
  activeTab?: string;
  color?: 'black' | 'green';
  type?: 'badges' | 'dots' | 'badges-connected';
  title?: string;
}

class ContentTabs extends React.Component<IComponentProps, IComponentState> {
  constructor(props: IComponentProps) {
    super(props);
    this.state = {
      activeTab: props.activeTab || props.tabs[0].title
    };
  }
  render() {
    const { tabs, color, title, type } = this.props;
    const { activeTab } = this.state;
    const radioButtons = tabs.map(item => {
      return { value: item.title, label: item.title };
    });
    return (
      <div className="content-tabs">
        {title && <p className="content-tabs__title">{title}</p>}
        <FormRadio radioButtons={radioButtons} onChange={this.onChange} defaultValue={activeTab} color={color} type={type} />
        {tabs.map(item => {
          if (item.title === activeTab) {
            return <div key={item.title}>{item.content}</div>;
          }
          return null;
        })}
      </div>
    );
  }
  onChange = (e: RadioChangeEvent) => {
    this.setState({ activeTab: e.target.value });
  };
}
export default ContentTabs;
