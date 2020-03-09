import CalendarInput from '../CalendarInput';
import DateTimePicker from '../DateTimePicker';
import TextInput, {
  URLInput,
  EMailInput,
  PhoneNumberInput,
} from '../TextInput';
import TextAreaInput from '../TextAreaInput';
import Checkbox from '../Checkbox';
import CheckboxGroup from '../CheckboxGroup';
import Switch from '../Switch';
import Select from '../Select';
import MultiTagChooser from '../MultiTagChooser';
import TagChooser from '../TagChooser';
import RelationChooser from '../RelationChooser';
import MultiRelationChooser from '../MultiRelationChooser';
import LanguageSelect from '../LanguageSelect';
import MapView from '../MapView';
import RichTextArea from '../RichTextArea';
import SingleUpload from '../SingleUpload';
import MultiUpload from '../MultiUpload';
import Multiform from '../Multiform';
import NumberInput from '../NumberInput';

export default type => {
  switch (type) {
    case 'calendar':
      return CalendarInput;
    case 'textinput':
      return TextInput;
    case 'url':
      return URLInput;
    case 'email':
      return EMailInput;
    case 'phone':
      return PhoneNumberInput;
    case 'textarea':
      return TextAreaInput;
    case 'richtext':
      return RichTextArea;
    case 'checkbox':
      return Checkbox;
    case 'checkboxgroup':
      return CheckboxGroup;
    case 'switch':
      return Switch;
    case 'select':
      return Select;
    case 'tagchooser':
      return TagChooser;
    case 'multitagchooser':
      return MultiTagChooser;
    case 'date':
      return DateTimePicker;
    case 'relation':
      return RelationChooser;
    case 'multirelation':
      return MultiRelationChooser;
    case 'languageSelect':
      return LanguageSelect;
    case 'map':
      return MapView;
    case 'upload':
      return SingleUpload;
    case 'multiupload':
      return MultiUpload;
    case 'multiform':
      return Multiform;
    case 'openingHours':
      return TextInput;
    case 'number':
      return NumberInput;
    default:
      return ({ label, ...rest }) => {
        if (type && label) {
          console.warn('no component found for:', label, type, rest);
        }
        return null;
      };
  }
};
