import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList } from 'react-native';

import BookCount from "./components/book-count";
import CustomActionButton from "./components/custom-action-button";
import { Ionicons } from "@expo/vector-icons";

import colors from './assets/colors';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      isAddNewBookVisible: false,
      textInputData: '',
      books: [],
      bookData: {
        author: '',
        publisher: ''
      }
    }
  }

  showAddNewBook = () => {
    this.setState({ isAddNewBookVisible: true })
  }

  hideAddNewBook = () => {
    this.setState({ isAddNewBookVisible: false })
  }

  addBook = (book) => {
    this.setState(
      (state, props) => ({
        books: [...state.books, book],
        totalCount: state.totalCount + 1,
        readingCount: state.readingCount + 1,
        isAddNewBookVisible: false,
      }),
      () => {
        console.log(this.state);
      }
    );
  };

  markAsRead = (selectedBook, index) => {
    let newList = this.state.books.filter(book => book !== selectedBook);

    this.setState(prevState => ({
      books: newList,
      readingCount: prevState.readingCount - 1,
      readCount: prevState.readCount + 1
    }));
  };

  renderItem = (item, index) => (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemTitleContainer}>
        <Text>{item}</Text>
      </View>

      <CustomActionButton style={styles.markasReadButton} onPress={() => this.markAsRead(item, index)}>
        <Text style={styles.markAsReadButtonText}>Mark as Read</Text>
      </CustomActionButton>
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Book Worm</Text>
        </View>
        <View style={styles.container}>
          {this.state.isAddNewBookVisible && (
            <View style={styles.textInputContainer}>
              <TextInput onChangeText={(text) => this.setState({ textInputData: text })} style={styles.textInput} placeholder='Enter Book Name' placeholderTextColor='grey' />

              <CustomActionButton style={styles.checkmarkButton} onPress={() => this.addBook(this.state.textInputData)}>
                <Ionicons name="ios-checkmark" color="white" size={40} />
              </CustomActionButton>

              <CustomActionButton onPress={this.hideAddNewBook}>
                <Ionicons name="ios-close" color="white" size={40} />
              </CustomActionButton>
            </View>
          )}

          <FlatList
            data={this.state.books}
            renderItem={({ item }, index) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View style={styles.listEmptyComponent}>
                <Text style={styles.listEmptyComponentText}>Not Reading Any Books</Text>
              </View>
            }
          />

          <CustomActionButton position="right" style={styles.addNewBookButton} onPress={this.showAddNewBook}>
            <Text style={styles.addNewBookButtonText}>+</Text>
          </CustomActionButton>

        </View>

        <View style={styles.footer}>
          <BookCount title='Book Title' count={this.state.totalCount} />
          <BookCount title='Reading' count={this.state.readingCount} />
          <BookCount title='Read' count={this.state.readCount} />
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: 24
  },
  textInputContainer: {
    height: 50,
    flexDirection: 'row'
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.bgTextInput,
    paddingLeft: 5,
  },
  checkmarkButton: {
    backgroundColor: colors.bgSuccess
  },
  listItemContainer: {
    height: 50,
    flexDirection: 'row'
  },
  listItemTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5
  },
  listEmptyComponent: {
    marginTop: 50,
    alignItems: 'center'
  },
  listEmptyComponentText: {
    fontWeight: 'bold'
  },
  markasReadButton: {
    width: 100,
    backgroundColor: colors.bgSuccess
  },
  markAsReadButtonText: {
    fontWeight: 'bold',
    color: 'white'
  },
  addNewBookButton: {
    backgroundColor: colors.bgPrimary,
    borderRadius: 25
  },
  addNewBookButtonText: {
    color: 'white',
    fontSize: 30
  },
  footer: {
    height: 70,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderColor,
    flexDirection: 'row'
  }
});
