'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable */

var defaultSelectInputComponent = function defaultSelectInputComponent(props) {
  return _react2.default.createElement('input', {
    type: props.selectType || 'checkbox',
    checked: props.checked,
    onClick: function onClick(e) {
      var shiftKey = e.shiftKey;

      e.stopPropagation();
      props.onClick(props.id, shiftKey, props.row);
    },
    onChange: function onChange() {}
  });
};

exports.default = function (Component, options) {
  var wrapper = function (_React$Component) {
    _inherits(RTSelectTable, _React$Component);

    function RTSelectTable(props) {
      _classCallCheck(this, RTSelectTable);

      return _possibleConstructorReturn(this, (RTSelectTable.__proto__ || Object.getPrototypeOf(RTSelectTable)).call(this, props));
    }

    _createClass(RTSelectTable, [{
      key: 'rowSelector',
      value: function rowSelector(row) {
        if (!row || !row.hasOwnProperty(this.props.keyField)) return null;
        var _props = this.props,
            toggleSelection = _props.toggleSelection,
            selectType = _props.selectType,
            keyField = _props.keyField;

        var checked = this.props.isSelected(row[this.props.keyField]);
        var inputProps = {
          checked: checked,
          onClick: toggleSelection,
          selectType: selectType,
          id: row[keyField],
          row: row
        };
        return _react2.default.createElement(this.props.SelectInputComponent, inputProps);
      }
    }, {
      key: 'headSelector',
      value: function headSelector(row) {
        var selectType = this.props.selectType;

        if (selectType === 'radio') return null;

        var _props2 = this.props,
            toggleAll = _props2.toggleAll,
            checked = _props2.selectAll,
            SelectAllInputComponent = _props2.SelectAllInputComponent;

        var inputProps = {
          checked: checked,
          onClick: toggleAll,
          selectType: selectType
        };

        return _react2.default.createElement(SelectAllInputComponent, inputProps);
      }

      // this is so we can expose the underlying ReactTable to get at the sortedData for selectAll

    }, {
      key: 'getWrappedInstance',
      value: function getWrappedInstance() {
        if (!this.wrappedInstance) console.warn('RTSelectTable - No wrapped instance');
        if (this.wrappedInstance.getWrappedInstance) return this.wrappedInstance.getWrappedInstance();else return this.wrappedInstance;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props3 = this.props,
            originalCols = _props3.columns,
            isSelected = _props3.isSelected,
            toggleSelection = _props3.toggleSelection,
            toggleAll = _props3.toggleAll,
            keyField = _props3.keyField,
            selectAll = _props3.selectAll,
            selectType = _props3.selectType,
            selectWidth = _props3.selectWidth,
            SelectAllInputComponent = _props3.SelectAllInputComponent,
            SelectInputComponent = _props3.SelectInputComponent,
            rest = _objectWithoutProperties(_props3, ['columns', 'isSelected', 'toggleSelection', 'toggleAll', 'keyField', 'selectAll', 'selectType', 'selectWidth', 'SelectAllInputComponent', 'SelectInputComponent']);

        var select = {
          id: '_selector',
          accessor: function accessor() {
            return 'x';
          }, // this value is not important
          Header: this.headSelector.bind(this),
          Cell: function Cell(ci) {
            return _this2.rowSelector.bind(_this2)(ci.original);
          },
          width: selectWidth || 30,
          filterable: true,
          sortable: true,
          resizable: false,
          style: { textAlign: 'center' }
        };

        var columns = [select].concat(_toConsumableArray(originalCols));
        var extra = {
          columns: columns
        };
        return _react2.default.createElement(Component, _extends({}, rest, extra, { ref: function ref(r) {
            return _this2.wrappedInstance = r;
          } }));
      }
    }]);

    return RTSelectTable;
  }(_react2.default.Component);

  wrapper.displayName = 'RTSelectTable';
  wrapper.defaultProps = {
    keyField: '_id',
    isSelected: function isSelected(key) {
      console.log('No isSelected handler provided:', { key: key });
    },
    selectAll: false,
    toggleSelection: function toggleSelection(key, shift, row) {
      console.log('No toggleSelection handler provided:', { key: key, shift: shift, row: row });
    },
    toggleAll: function toggleAll() {
      console.log('No toggleAll handler provided.');
    },
    selectType: 'checkbox',
    SelectInputComponent: defaultSelectInputComponent,
    SelectAllInputComponent: defaultSelectInputComponent
  };

  return wrapper;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ob2Mvc2VsZWN0VGFibGUvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdFNlbGVjdElucHV0Q29tcG9uZW50IiwicHJvcHMiLCJzZWxlY3RUeXBlIiwiY2hlY2tlZCIsInNoaWZ0S2V5IiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsIm9uQ2xpY2siLCJpZCIsInJvdyIsIkNvbXBvbmVudCIsIm9wdGlvbnMiLCJ3cmFwcGVyIiwiaGFzT3duUHJvcGVydHkiLCJrZXlGaWVsZCIsInRvZ2dsZVNlbGVjdGlvbiIsImlzU2VsZWN0ZWQiLCJpbnB1dFByb3BzIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiU2VsZWN0SW5wdXRDb21wb25lbnQiLCJ0b2dnbGVBbGwiLCJzZWxlY3RBbGwiLCJTZWxlY3RBbGxJbnB1dENvbXBvbmVudCIsIndyYXBwZWRJbnN0YW5jZSIsImNvbnNvbGUiLCJ3YXJuIiwiZ2V0V3JhcHBlZEluc3RhbmNlIiwib3JpZ2luYWxDb2xzIiwiY29sdW1ucyIsInNlbGVjdFdpZHRoIiwicmVzdCIsInNlbGVjdCIsImFjY2Vzc29yIiwiSGVhZGVyIiwiaGVhZFNlbGVjdG9yIiwiYmluZCIsIkNlbGwiLCJyb3dTZWxlY3RvciIsImNpIiwib3JpZ2luYWwiLCJ3aWR0aCIsImZpbHRlcmFibGUiLCJzb3J0YWJsZSIsInJlc2l6YWJsZSIsInN0eWxlIiwidGV4dEFsaWduIiwiZXh0cmEiLCJyIiwiZGlzcGxheU5hbWUiLCJkZWZhdWx0UHJvcHMiLCJsb2ciLCJrZXkiLCJzaGlmdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7OzsrZUFGQTs7QUFJQSxJQUFNQSw4QkFBOEIsU0FBOUJBLDJCQUE4QixRQUFTO0FBQzNDLFNBQ0U7QUFDRSxVQUFNQyxNQUFNQyxVQUFOLElBQW9CLFVBRDVCO0FBRUUsYUFBU0QsTUFBTUUsT0FGakI7QUFHRSxhQUFTLG9CQUFLO0FBQUEsVUFDSkMsUUFESSxHQUNTQyxDQURU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QUFQO0FBQ0QsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgZGVmYXVsdFNlbGVjdElucHV0Q29tcG9uZW50ID0gcHJvcHMgPT4ge1xuICByZXR1cm4gKFxuICAgIDxpbnB1dFxuICAgICAgdHlwZT17cHJvcHMuc2VsZWN0VHlwZSB8fCAnY2hlY2tib3gnfVxuICAgICAgY2hlY2tlZD17cHJvcHMuY2hlY2tlZH1cbiAgICAgIG9uQ2xpY2s9e2UgPT4ge1xuICAgICAgICBjb25zdCB7IHNoaWZ0S2V5IH0gPSBlXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgcHJvcHMub25DbGljayhwcm9wcy5pZCwgc2hpZnRLZXksIHByb3BzLnJvdylcbiAgICAgIH19XG4gICAgICBvbkNoYW5nZT17KCkgPT4ge319XG4gICAgLz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCAoQ29tcG9uZW50LCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHdyYXBwZXIgPSBjbGFzcyBSVFNlbGVjdFRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgc3VwZXIocHJvcHMpXG4gICAgfVxuXG4gICAgcm93U2VsZWN0b3Iocm93KSB7XG4gICAgICBpZiAoIXJvdyB8fCAhcm93Lmhhc093blByb3BlcnR5KHRoaXMucHJvcHMua2V5RmllbGQpKSByZXR1cm4gbnVsbFxuICAgICAgY29uc3QgeyB0b2dnbGVTZWxlY3Rpb24sIHNlbGVjdFR5cGUsIGtleUZpZWxkIH0gPSB0aGlzLnByb3BzXG4gICAgICBjb25zdCBjaGVja2VkID0gdGhpcy5wcm9wcy5pc1NlbGVjdGVkKHJvd1t0aGlzLnByb3BzLmtleUZpZWxkXSlcbiAgICAgIGNvbnN0IGlucHV0UHJvcHMgPSB7XG4gICAgICAgIGNoZWNrZWQsXG4gICAgICAgIG9uQ2xpY2s6IHRvZ2dsZVNlbGVjdGlvbixcbiAgICAgICAgc2VsZWN0VHlwZSxcbiAgICAgICAgaWQ6IHJvd1trZXlGaWVsZF0sXG4gICAgICAgIHJvdyxcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMucHJvcHMuU2VsZWN0SW5wdXRDb21wb25lbnQsIGlucHV0UHJvcHMpXG4gICAgfVxuXG4gICAgaGVhZFNlbGVjdG9yKHJvdykge1xuICAgICAgY29uc3QgeyBzZWxlY3RUeXBlIH0gPSB0aGlzLnByb3BzXG4gICAgICBpZiAoc2VsZWN0VHlwZSA9PT0gJ3JhZGlvJykgcmV0dXJuIG51bGxcblxuICAgICAgY29uc3QgeyB0b2dnbGVBbGwsIHNlbGVjdEFsbDogY2hlY2tlZCwgU2VsZWN0QWxsSW5wdXRDb21wb25lbnQgfSA9IHRoaXMucHJvcHNcbiAgICAgIGNvbnN0IGlucHV0UHJvcHMgPSB7XG4gICAgICAgIGNoZWNrZWQsXG4gICAgICAgIG9uQ2xpY2s6IHRvZ2dsZUFsbCxcbiAgICAgICAgc2VsZWN0VHlwZSxcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0QWxsSW5wdXRDb21wb25lbnQsIGlucHV0UHJvcHMpXG4gICAgfVxuXG4gICAgLy8gdGhpcyBpcyBzbyB3ZSBjYW4gZXhwb3NlIHRoZSB1bmRlcmx5aW5nIFJlYWN0VGFibGUgdG8gZ2V0IGF0IHRoZSBzb3J0ZWREYXRhIGZvciBzZWxlY3RBbGxcbiAgICBnZXRXcmFwcGVkSW5zdGFuY2UoKSB7XG4gICAgICBpZiAoIXRoaXMud3JhcHBlZEluc3RhbmNlKSBjb25zb2xlLndhcm4oJ1JUU2VsZWN0VGFibGUgLSBObyB3cmFwcGVkIGluc3RhbmNlJylcbiAgICAgIGlmICh0aGlzLndyYXBwZWRJbnN0YW5jZS5nZXRXcmFwcGVkSW5zdGFuY2UpIHJldHVybiB0aGlzLndyYXBwZWRJbnN0YW5jZS5nZXRXcmFwcGVkSW5zdGFuY2UoKVxuICAgICAgZWxzZSByZXR1cm4gdGhpcy53cmFwcGVkSW5zdGFuY2VcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbHVtbnM6IG9yaWdpbmFsQ29scyxcbiAgICAgICAgaXNTZWxlY3RlZCxcbiAgICAgICAgdG9nZ2xlU2VsZWN0aW9uLFxuICAgICAgICB0b2dnbGVBbGwsXG4gICAgICAgIGtleUZpZWxkLFxuICAgICAgICBzZWxlY3RBbGwsXG4gICAgICAgIHNlbGVjdFR5cGUsICAgXG4gICAgICAgIHNlbGVjdFdpZHRoLFxuICAgICAgICBTZWxlY3RBbGxJbnB1dENvbXBvbmVudCxcbiAgICAgICAgU2VsZWN0SW5wdXRDb21wb25lbnQsXG4gICAgICAgIC4uLnJlc3RcbiAgICAgIH0gPSB0aGlzLnByb3BzXG4gICAgICBjb25zdCBzZWxlY3QgPSB7XG4gICAgICAgIGlkOiAnX3NlbGVjdG9yJyxcbiAgICAgICAgYWNjZXNzb3I6ICgpID0+ICd4JywgLy8gdGhpcyB2YWx1ZSBpcyBub3QgaW1wb3J0YW50XG4gICAgICAgIEhlYWRlcjogdGhpcy5oZWFkU2VsZWN0b3IuYmluZCh0aGlzKSxcbiAgICAgICAgQ2VsbDogY2kgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJvd1NlbGVjdG9yLmJpbmQodGhpcykoY2kub3JpZ2luYWwpXG4gICAgICAgIH0sXG4gICAgICAgIHdpZHRoOiBzZWxlY3RXaWR0aCB8fCAzMCxcbiAgICAgICAgZmlsdGVyYWJsZTogdHJ1ZSxcbiAgICAgICAgc29ydGFibGU6IHRydWUsXG4gICAgICAgIHJlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIHN0eWxlOiB7IHRleHRBbGlnbjogJ2NlbnRlcicgfSxcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29sdW1ucyA9IFtzZWxlY3QsIC4uLm9yaWdpbmFsQ29sc11cbiAgICAgIGNvbnN0IGV4dHJhID0ge1xuICAgICAgICBjb2x1bW5zLFxuICAgICAgfVxuICAgICAgcmV0dXJuIDxDb21wb25lbnQgey4uLnJlc3R9IHsuLi5leHRyYX0gcmVmPXtyID0+ICh0aGlzLndyYXBwZWRJbnN0YW5jZSA9IHIpfSAvPlxuICAgIH1cbiAgfVxuXG4gIHdyYXBwZXIuZGlzcGxheU5hbWUgPSAnUlRTZWxlY3RUYWJsZSdcbiAgd3JhcHBlci5kZWZhdWx0UHJvcHMgPSB7XG4gICAga2V5RmllbGQ6ICdfaWQnLFxuICAgIGlzU2VsZWN0ZWQ6IGtleSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnTm8gaXNTZWxlY3RlZCBoYW5kbGVyIHByb3ZpZGVkOicsIHsga2V5IH0pXG4gICAgfSxcbiAgICBzZWxlY3RBbGw6IGZhbHNlLFxuICAgIHRvZ2dsZVNlbGVjdGlvbjogKGtleSwgc2hpZnQsIHJvdykgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ05vIHRvZ2dsZVNlbGVjdGlvbiBoYW5kbGVyIHByb3ZpZGVkOicsIHsga2V5LCBzaGlmdCwgcm93IH0pXG4gICAgfSxcbiAgICB0b2dnbGVBbGw6ICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdObyB0b2dnbGVBbGwgaGFuZGxlciBwcm92aWRlZC4nKVxuICAgIH0sXG4gICAgc2VsZWN0VHlwZTogJ2NoZWNrYm94JyxcbiAgICBTZWxlY3RJbnB1dENvbXBvbmVudDogZGVmYXVsdFNlbGVjdElucHV0Q29tcG9uZW50LFxuICAgIFNlbGVjdEFsbElucHV0Q29tcG9uZW50OiBkZWZhdWx0U2VsZWN0SW5wdXRDb21wb25lbnQsXG4gIH1cblxuICByZXR1cm4gd3JhcHBlclxufVxuIl19