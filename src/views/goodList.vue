<template>
  <div>
    <headTop></headTop>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="品牌名">
              <span>{{ props.row.brand }}</span>
            </el-form-item>
            <el-form-item label="分类">
              <span>{{ props.row.category_name }}</span>
            </el-form-item>
            <el-form-item label="酒名">
              <span>{{ props.row.item }}</span>
            </el-form-item>
            <el-form-item label="市场价">
              <span>{{ props.row.marketPrice }}</span>
            </el-form-item>
            <el-form-item label="产地">
              <span>{{ props.row.origin }}</span>
            </el-form-item>
            <el-form-item label="打包费">
              <span>{{ props.row.packingsPrice }}</span>
            </el-form-item>
            <el-form-item label="图片列表">
              <span>{{ props.row.pic_array }}</span>
            </el-form-item>
            <el-form-item label="售价">
              <span>{{ props.row.price}}</span>
            </el-form-item>
            <el-form-item label="销售量">
              <span>{{ props.row.sale_count}}</span>
            </el-form-item>
            <el-form-item label="店铺名">
              <span>{{ props.row.shop}}</span>
            </el-form-item>
            <el-form-item label="库存">
              <span>{{ props.row.stock}}</span>
            </el-form-item>
            <el-form-item label="封面图片">
              <span>{{ props.row.thumb_url}}</span>
            </el-form-item>
            <el-form-item label="标题">
              <span>{{ props.row.title}}</span>
            </el-form-item>
            <el-form-item label="度数">
              <span>{{ props.row.degrees}}</span>
            </el-form-item>
            <el-form-item label="容量">
              <span>{{ props.row.capacity}}</span>
            </el-form-item>


          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="品牌名"
          prop="brand">
      </el-table-column>
      <el-table-column
          label="售价"
          prop="price">
      </el-table-column>
      <el-table-column
          sortable
          prop="stock"
          label="库存"  >
        <template slot-scope="scope" >
          <el-input-number size="mini" v-model="scope.row.stock"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
          sortable
          prop="isShowHP"
          label="首页推荐"  >
        <template slot-scope="scope" >
          <el-switch v-model="scope.row.isShowHP"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
          label="店铺名"
          prop="shop">
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button
              size="small"
              @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="Pagination">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count">
      </el-pagination>
    </div>
    <el-dialog  title="修改商品信息" :visible.sync="dialogFormVisible">
      <editGoodForm :formModel="selectedRow"> </editGoodForm>
    </el-dialog>

  </div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import editGoodForm from "../components/editGoodForm";
import headTop from "../components/headTop";
import {getGoodList} from "../utils/api"
export default {
  data() {
    return {
      selectedRow:{},
      dialogFormVisible:false,
      count:4,
      tableData: [{
        isShowHP: true,
        brand : "红星二锅头",
        category_name: "白酒",
        item: '二锅头',
        marketPrice: '50',
        origin: '北京',
        packingsPrice: '4',
        pic_array: [],
        price: '30',
        sale_count: '22',
        shop: '王府井店',
        stock: '1',
        thumb_url: '',
        title: '红星二锅头',
        degrees: '50',
        capacity:'300',

      }, {
        isShowHP: true,

        brand : "红星二锅头",
        category_name: "白酒",
        item: '二锅头',
        marketPrice: '50',
        origin: '北京',
        packingsPrice: '4',
        pic_array: [],
        price: '30',
        sale_count: '22',
        shop: '王府井店',
        stock: '111',
        thumb_url: '',
        title: '红星二锅头',
        degrees: '50',
        capacity:'300',
      }, {
        isShowHP: true,

        brand : "红星二锅头",
        category_name: "白酒",
        item: '二锅头',
        marketPrice: '50',
        origin: '北京',
        packingsPrice: '4',
        pic_array: [],
        price: '30',
        sale_count: '22',
        shop: '王府井店',
        stock: '122',
        thumb_url: '',
        title: '红星二锅头',
        degrees: '50',
        capacity:'300',
      }, {
        isShowHP: false,

        brand : "红星二锅头",
        category_name: "白酒",
        item: '二锅头',
        marketPrice: '50',
        origin: '北京',
        packingsPrice: '4',
        pic_array: [],
        price: '30',
        sale_count: '22',
        shop: '王府井店',
        stock: '100',
        thumb_url: '',
        title: '红星二锅头',
        degrees: '50',
        capacity:'300',
      }]
    }
  },
  computed: {

  },
  components: {
    headTop,
    editGoodForm
  },
   created() {
    this.initData();
  },
  methods: {
    handleEdit(row) {
      console.log(row)
      this.selectedRow = row
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    async initData(){

      try {
        const shopData = await getGoodList({offset: this.offset, limit: this.limit});
        console.log(shopData.data.data)
        if (shopData.status === 200) {
          //this.count = shopData.data.data.length;
          this.tableData = []
          shopData.data.data.forEach(item => {
            item=JSON.parse(item);
            console.log(item)
            const td = {};
            td.isShowHP=item.recommend,
            td.brand=item.brand,
            td.category_name= item.category_name,
            td.item= item.item,
            td.marketPrice= item.marketPrice,
            td.origin= item.origin,
            td.packingsPrice= item.packingsPrice,
            td.pic_array1= item.pic_array,
            td.pic_array2= item.product_desc_url,
            td.price= item.price,
            td.sale_count= item.sale_count,
            td.shop= item.shop,
            td.stock= item.stock,
            td.thumb_url= item.thumb_url,
            td.title= item.title,
            td.degrees= item.specification.split(',')[0],
            td.capacity=item.specification.split(',')[1],
            this.tableData.push(td);
            console.log(td.mapData)
          })
        }else{
          throw new Error('获取数据失败');
        }

      } catch (e) {
        console.log('获取数据失败', e);
      }
    },
  }
}
</script>


<style lang="less">
@import '../style/mixin';
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 30%;
}
.table_container{
  padding: 20px;
}
.Pagination{
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
